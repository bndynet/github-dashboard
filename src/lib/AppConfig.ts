class AppConfig {
    githubUser: string;
    githubToken: string;
    githubUrl: string;
}

export const appConfig = process.env.NODE_ENV === 'production' ? require('../app-config.prod.json') : require('../app-config.json');
