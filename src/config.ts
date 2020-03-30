import * as dotenv from 'dotenv';
import {resolve} from "path";

dotenv.config();

export default interface Config {
    port: string|number,
    mongoUrl: string,
    env: string;
    logLevel: string;
    staticRoute: string;
};

export const configuration: Config = {
    port: process.env.PORT || 3000,
    mongoUrl: process.env.MONGODB || '',
    env: process.env.ENV || process.env.NODE_ENV || 'dev',
    logLevel: process.env.LOG_LEVEL || 'debug',
    staticRoute: resolve(__dirname, process.env.STATIC || './public')
};
