import * as _ from 'lodash';
import * as React from 'react';
import { Panel, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { InlineLoading } from './InlineLoading';

interface IssueListProps {
    loading?: boolean;
    title?: string;
    data?: any[];
    theme?: string;
}

interface IssueListState {}

export class IssueList extends React.Component<IssueListProps, IssueListState> {
    constructor(props: IssueListProps) {
        super(props);
    }
    render() {
        _.forEach(this.props.data, (item) => {
            if (item.repository_url) {
                item.repo = item.repository_url.substring(item.repository_url.lastIndexOf('/') + 1);
                item.repo_url = item.repository_url.replace('//api.', '//').replace('/repos/', '/');
            }
        });
        const tooltipComments = <Tooltip id='tooltip'>Comments</Tooltip>;
        return (
            <Panel bsStyle={this.props.theme}>
                <Panel.Heading>
                    {this.props.title}
                    <span className='pull-right'>
                        <InlineLoading loading={this.props.loading} />
                    </span>
                </Panel.Heading>
                <Panel.Body>
                    <div className='list-group'>
                        {this.props.data.map((item) => (
                            <a
                                key={item.url}
                                href={item.html_url}
                                target='_blank'
                                className={item.state === 'closed' ? 'list-group-item' : 'list-group-item'}>
                                <i
                                    className={
                                        item.state === 'closed' ? (
                                            'glyphicon glyphicon-ok-circle text-success'
                                        ) : (
                                            'glyphicon glyphicon-question-sign text-danger'
                                        )
                                    }
                                />&nbsp; [{item.repo}] - {item.title}
                                {item.labels.map((label) => (
                                    <span key={label.id}>
                                        &nbsp;&nbsp;
                                        <span
                                            className='label label-default'
                                            style={{ backgroundColor: '#' + label.color }}>
                                            {label.name}
                                        </span>
                                    </span>
                                ))}
                                {item.comments > 0 && (
                                    <span className='badge badge-success'>
                                        <OverlayTrigger placement='top' overlay={tooltipComments}>
                                            <span>{item.comments}</span>
                                        </OverlayTrigger>
                                    </span>
                                )}
                            </a>
                        ))}
                    </div>
                </Panel.Body>
            </Panel>
        );
    }
}
