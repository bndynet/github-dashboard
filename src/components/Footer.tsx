import * as React from 'react';
import { appConfig } from '../lib/AppConfig';

export class Footer extends React.Component<{}, {}> {
    user: string;
    githubUrl: string;

    constructor(props) {
        super(props);
        this.user = appConfig.githubUser;
        this.githubUrl = appConfig.githubUrl;
    }

    render() {
        return (
            <footer className='row'>
                <div className='col-md-6'>
                    Dashboard for GitHub -<a href={this.githubUrl} target='_blank'>
                        {' '}
                        {this.user}{' '}
                    </a>,
                    Powered by <a href="mailto:zb@bndy.net">Bendy Zhang</a> © <a href="http://bndy.net" target="_blank">BNDY-NET</a>
                </div>
                <div className='col-md-6 text-right'>
                    v{APP_VERSION} build {APP_BUILD}
                </div>
            </footer>
        );
    }
}
