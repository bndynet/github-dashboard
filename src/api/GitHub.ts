import { appConfig } from '../lib/AppConfig';
import { message } from '../lib/Message';

export class GitHub {
    username: string;
    api: any;
    constructor() {
        this.api = require('@octokit/rest')();
        // username in querystring
        let gu = window.location.search.match(/\?gu=([^&]+)/);
        if (gu && gu.length > 1) {
            this.username = gu[1];
            appConfig.githubUser = this.username;
        } else {
            this.username = appConfig.githubUser;
            if (appConfig.githubToken) {
                this.api.authenticate({
                    type: 'token',
                    token: appConfig.githubToken,
                });
            }
        }
    }

    getUser() {
        return new Promise((resolve) => {
            this.api.users.get({})
                .then((result) => {
                    resolve(result.data);
                }, (err) => {
                    message.warn('Failed to Get User Profile', 'Code ' + err.code + ': ' + JSON.parse(err.message).message);
                });
        });
    }

    getIssues() {
        const q = 'author:' + this.username;
        const per_page = 100;
        const page = 1;
        return new Promise((resolve) => {
            this.api.search
                .issues({
                    q,
                    per_page,
                    page
                })
                .then((result) => {
                    resolve(result.data);
                }, (err) => {
                    message.error('GitHub Error', err.code + ': ' + err.message);
                });
        });
    }

    getEvents() {
        let username = this.username;
        let per_page = 100;
        let page = 1;
        return new Promise((resolve) => {
            this.api.activity
                .getEventsForUser({
                    username,
                    per_page,
                    page
                })
                .then((result) => {
                    resolve(result.data);
                }, (err) => {
                    message.error('GitHub Error', err.code + ': ' + err.message);
                });
        });
    }

    getStatsCommitActivity(repo) {
        let owner = this.username;
        return new Promise((resolve, rejection) => {
            this.api.repos
                .getStatsCommitActivity({
                    owner,
                    repo
                })
                .then((result) => {
                    resolve(result.data);
                }, (err) => {
                    message.error('GitHub Error', err.code + ': ' + err.message);
                });
        });
    }
}
