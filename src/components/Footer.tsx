import * as React from 'react';
import { appConfig } from '../lib/AppConfig';


interface FooterProps {
    user: any;
}

export class Footer extends React.Component<FooterProps, {}> {
    githubUrl: string;

    constructor(props: FooterProps) {
        super(props);
        this.githubUrl = appConfig.getGithubUrl(this.props.user);
    }

    render() {
        return (
            <footer className='row'>
                <div className='col-md-6'>
                    Dashboard v{APP_VERSION} for GitHub -<a href={this.githubUrl} target='_blank'>
                        {' '}
                        {this.props.user}{' '}
                    </a>
                </div>
                <div className='col-md-6 text-right'>
                    Powered by <a href="mailto:zb@bndy.net">Bendy Zhang</a> © <a href="http://bndy.net" target="_blank">BNDY-NET</a>
                </div>
            </footer>
        );
    }
}
