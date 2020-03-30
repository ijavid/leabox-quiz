import * as dotenv from 'dotenv';

dotenv.config();

export default interface Config {
    port: string|number,
    mongoUrl: string,
    env: string;
    logLevel: string;
    staticRoutes: string;
};

export const configuration: Config = {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGODB || 'mongodb+srv://ijavid:YeQbP2V6GV7ID5NA@cluster0-ibolf.gcp.mongodb.net/test?retryWrites=true&w=majority',
    env: process.env.ENV || process.env.NODE_ENV || 'dev',
    logLevel: process.env.LOG_LEVEL || 'debug',
    staticRoutes: process.env.STATIC || './public'
};
