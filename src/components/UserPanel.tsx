import * as React from 'react';
import { Panel, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Loading } from './Loading';
import { InlineLoading } from './InlineLoading';

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
                    {this.props.data.avatar_url && (
                        <a href={this.props.data.blog || '#'}>
                            <img className='img-user' src={this.props.data.avatar_url} />
                        </a>
                    )}
                    <strong>{this.props.data.name}</strong>
                    <em>{this.props.data.bio}</em>
                    <div>{this.props.data.email}</div>
                    <div>{this.props.data.location}</div>
                </Panel.Body>
            </Panel>
        );
    }
}
