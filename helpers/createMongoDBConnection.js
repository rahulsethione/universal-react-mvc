const mongoose = require('mongoose');
const Promise = require('bluebird');

/* Override Mongoose's promise */
mongoose.Promise = Promise;

const DEFAULT_PORT = 27017;

/**
 * Promisified async connection
 */
const asyncConnection = Promise.promisify(mongoose.connect, {
    context: mongoose
});

/**
 * Function for creating connection with MongoDB
 * @param { host , port, database, username, password } options
 * @returns Promise
 */
function createMongoDBConnection(options) {
    let { host = 'localhost', port = DEFAULT_PORT, database, username, password } = options;
    let connectionUrl;
    try {
        if (!database) {
            throw new Error('Connection Error: Database name is required!');
        } else {
            if (username && password) {
                connectionUrl = `mongodb://${username}:${password}@${host}:${port}/${database}`;
            } else if(username || password) {
                throw new Error('Connection Error: Please provide valid \'username\' and \'password\'!');
            } else {
                connectionUrl = `mongodb://${host}:${port}/${database}`;
            }

            mongoose.connection.on('connected', () => {
                console.log(`MongoDB Connection Successful: MongoDB Server connected to database '${database}' at '${host}:${port}'.`);
            });

            mongoose.connection.on('error', (err) => {
                console.log(`MongoDB Connection Error: Error connecting to database '${database}' at '${host}:${port}'`);
                console.log(err);
            });
            mongoose.connection.on('disconnected', () => {
                console.log(`MongoDB Connection Status: Disconnected to database '${database}' at '${host}:${port}'`);
            });

            process.on('SIGINT', () => {
                mongoose.connection.close(() => {
                    console.log(`MongoDB Connection Status: Disconnecting database '${database}' at '${host}:${port}' because of application failure.`);
                    process.exit(0);
                });
            });

            return asyncConnection(connectionUrl)

        }
    } catch (e) {
        console.log(`MongoDB Connection Failure: Unexpected error occured while connecting to database '${database}' at '${this.host}:${this.port}'\n`, e);
        return Promise.reject(e);
    }

};

/**
 * @exports function createMongoDBConnection
 */
module.exports = createMongoDBConnection;