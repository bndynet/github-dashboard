class AppConfig {
    githubUser: string;
    githubAgentUrl: string;

    public setGithubAccessToken(token: string) {
        if (token) {
            sessionStorage.setItem('github-token', token);
        } else {
            sessionStorage.removeItem('github-token');
        }
    }

    public getGithubAccessToken() {
        return sessionStorage.getItem('github-token');
    }

    public getGithubUrl (user?: string) {
        if (user) {
            return 'https://github.com/' + user;
        }
        return 'https://github.com/' + this.githubUser;
    }
}

export const appConfig: AppConfig = _.assignIn(new AppConfig(), 
    process.env.NODE_ENV === 'production' 
        ? require('../app-config.prod.json') 
        : require('../app-config.json')
);
