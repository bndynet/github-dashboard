import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/default';
import 'react-toastify/dist/ReactToastify.css';

import * as _ from 'lodash';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as moment from 'moment';
import { Grid, Row, Col, Tooltip, ButtonToolbar, OverlayTrigger, Button } from 'react-bootstrap';
import { UserPanel } from './components/UserPanel';
import { LineChart, LineChartData, LineChartDataItem, LineChartDataItemOption } from './components/ChartLine';
import { IssueList } from './components/IssueList';
import { GitHub } from './api/GitHub';
import { ChartDoughnut } from './components/ChartDoughnut';
import { Footer } from './components/Footer';
import { appConfig } from './lib/AppConfig';

import { ToastContainer } from 'react-toastify';

const dateFormat = 'DD/MM';
const maxIssues = 7;

interface IndexProps {}

interface IndexState {
    isLoadingUser: boolean;
    user: any;

    isLoadingEvent: boolean;
    eventChartData: LineChartData;

    issues: any[];
    issueChartData: any[];
    isLoadingIssues: boolean;
}

class Index extends React.Component<IndexProps, IndexState> {
    githubApi: GitHub;
    needToLoadUser: boolean;

    constructor(props: IndexProps) {
        super(props);
        // access token
        let accessTokenMatched = window.location.search.match(/\?access_token=([^&]+)/);
        if (accessTokenMatched && accessTokenMatched.length > 1) {
            let accessToken = accessTokenMatched[1];
            appConfig.setGithubAccessToken(accessToken);
            window.location.href = '/';
            return;
        }

        let githubUser = appConfig.githubUser;
        // username in querystring
        let gu = window.location.search.match(/\?gu=([^&]+)/);
        if (gu && gu.length > 1) {
            githubUser = appConfig.githubUser = gu[1];
            appConfig.setGithubAccessToken(null);
        }

        this.githubApi = new GitHub(githubUser);

        this.state = {
            isLoadingUser: false,
            user: {},

            isLoadingEvent: false,
            eventChartData: new LineChartData(),

            issues: [],
            issueChartData: [],
            isLoadingIssues: false
        };
    }

    componentDidMount() {
        if (appConfig.getGithubAccessToken()) {
            this.needToLoadUser = true;
            this._initDataViaOAuth();
        } else {
            this.needToLoadUser = false;
            this._initIssues();
            this._initEvents();
        }
    }

    render() {
        return (
            <div>
                <Grid>
                    <Row>
                        <Col md={3}>
                            <UserPanel loading={this.state.isLoadingUser} data={this.state.user} />
                        </Col>
                        <Col md={9}>
                            <LineChart
                                title='Activity'
                                data={this.state.eventChartData}
                                loading={this.state.isLoadingEvent}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <IssueList
                                title='Latest Issues'
                                data={this.state.issues}
                                loading={this.state.isLoadingIssues}
                            />
                        </Col>
                        <Col md={6}>
                            <ChartDoughnut
                                title='Issues'
                                data={this.state.issueChartData}
                                loading={this.state.isLoadingEvent}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Footer user={appConfig.githubUser} />
                        </Col>
                    </Row>
                </Grid>
                <ToastContainer />
            </div>
        );
    }

    _initDataViaOAuth() {
        this.setState({
            isLoadingUser: true
        });
        this.githubApi.getUser().then((result: any) => {
            this.setState({
                isLoadingUser: false,
                user: result
            });
            this.githubApi = new GitHub(result.login);
            this._initEvents();
            this._initIssues();
        });
    }

    _initIssues() {
        this.setState({
            isLoadingIssues: true
        });

        this.githubApi.getIssues().then((result: any) => {
            let all = result.total_count;
            let openedIssues = _.filter(result.items, (issue) => {
                return issue.state === 'open';
            });
            let closedIssues = _.filter(result.items, (issue) => {
                return issue.state === 'closed';
            });
            this.setState({
                isLoadingIssues: false,
                issueChartData: [
                    {
                        label: 'Open',
                        data: openedIssues.length,
                        backgroundColor: '#FF6384'
                    },
                    {
                        label: 'Closed',
                        data: closedIssues.length,
                        backgroundColor: '#36A2EB'
                    }
                ],
                issues: _.concat(openedIssues, _.slice(closedIssues, 0, maxIssues - openedIssues.length))
            });
        });
    }

    _initEvents() {
        this.setState({
            isLoadingEvent: true
        });

        this.githubApi.getEvents().then((result: any[]) => {
            this.setState({
                isLoadingEvent: false,
            });

            if (result && result.length === 0) {
                return;
            }

            let eventChartData = new LineChartData();
            let groups = _.groupBy(result, (event) => {
                return moment(event.created_at).format(dateFormat);
            });

            // get x labels
            let start = moment(result[result.length - 1].created_at).subtract(1, 'days');
            let end = moment(result[0]);
            while (start < moment()) {
                eventChartData.addLabel(start.format(dateFormat));
                start = start.add(1, 'days');
            }

            // group by project
            let projectMap = {};
            let groupsByProject = _.groupBy(result, (event) => {
                return event.repo.name;
            });
            let maxProject = 8;
            _.forEach(groupsByProject, (items, project) => {
                maxProject--;
                if (maxProject < 0) {
                    return false;
                }
                projectMap[project] = { data: [], items: items };
            });

            let activityItem = new LineChartDataItem('TOTAL');
            _.forEach(eventChartData.labels, (label) => {
                activityItem.addData(groups[label] ? groups[label].length : 0);
                _.forEach(projectMap, (val, key) => {
                    projectMap[key].data.push(
                        _.countBy(val.items, (item) => {
                            return moment(item.created_at).format(dateFormat) === label;
                        }).true || 0
                    );
                });
            });
            eventChartData.addItem(activityItem);

            _.forEach(projectMap, (val, key) => {
                let projectName = key.substring(key.lastIndexOf('/') + 1);
                let chartItem = new LineChartDataItem(projectName, val.data);
                eventChartData.addItem(chartItem);
            });

            this.setState({
                eventChartData: eventChartData
            });
        });
    }
}

ReactDOM.render(<Index />, document.getElementById('index'));
