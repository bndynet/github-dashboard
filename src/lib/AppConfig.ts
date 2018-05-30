class AppConfig {
    githubUser: string;

    public getGithubAccessToken() {

    }

    public getGithubUrl () {
        return 'https://github.com/' + this.githubUser;
    }
}

export const appConfig: AppConfig = _.assignIn(new AppConfig(), 
    process.env.NODE_ENV === 'production' 
        ? require('../app-config.prod.json') 
        : require('../app-config.json')
);
