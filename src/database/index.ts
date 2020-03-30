import mongoose from 'mongoose';
import Config from '../config';

export function setupDatabase(options: Config) {
    mongoose.Promise = Promise;
    return mongoose.connect(options.mongoUrl, {useNewUrlParser: true, useUnifiedTopology: false})
        .then(() => {
            console.log('Database connection successful');
        })
        .catch(err => {
            console.error("MongoDB connection error. Please make sure MongoDB is running. " + err);
            throw err;
        });
}
