import * as React from 'react';
import { Panel, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Loading } from './Loading';
import { InlineLoading } from './InlineLoading';
import { appConfig } from '../lib/AppConfig';

interface UserPanelProps {
    loading?: boolean;
    theme?: string;
    data: any;
}

export class UserPanel extends React.Component<UserPanelProps, {}> {
    constructor(props: UserPanelProps) {
        super(props);
    }
    render() {
        return (
            <Panel className='panel-user' bsStyle={this.props.theme}>
                <Panel.Body>
                    <Loading loading={this.props.loading} />
                    {!this.props.loading && this.props.data && this.props.data.login && (
                        <div>
                            {this.props.data.avatar_url && (
                                <a href={this.props.data.blog || '#'}>
                                    <img className='img-user' src={this.props.data.avatar_url} />
                                </a>
                            )}
                            <strong>{this.props.data.name}</strong>
                            <em>{this.props.data.bio}</em>
                            <div>{this.props.data.email}</div>
                            <div>{this.props.data.location}</div>
                        </div>
                    )}
                    {!this.props.loading && (!this.props.data || !this.props.data.login) && (
                        <div>
                            <a className="placeholder-user" onClick={this.getDetail}>
                                <i className="glyphicon glyphicon-user"></i>
                            </a>
                            <p>
                                <a onClick={this.getDetail}>View Your Dashboard</a>
                            </p>
                        </div>
                    )}
                </Panel.Body>
            </Panel>
        );
    }

    getDetail () {
        location.href = `${appConfig.githubAgentUrl}?redirect_uri=${location.origin}&target=github`;
    }

}
