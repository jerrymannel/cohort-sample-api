const mongoose = require('mongoose');
const pino = require('pino')

const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017?directConnection=true";
const MONGO_DB = process.env.MONGO_DB_NAME || 'cohort-sample-app';

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const logger = pino({
	level: LOG_LEVEL,
	formatters: {
		level: (label) => {
			return { level: label.toUpperCase() };
		},
		bindings(bindings) {
			return { hostname: bindings.hostname }
		}
	},
	timestamp: pino.stdTimeFunctions.isoTime,
});

const JWT_SECRET = process.env.JWT_SECRET || '123123123';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

const apiIgnorePaths = ['/api/auth/login'];

async function connectToMongoDB() {
	logger.info('Connecting to MongoDB');
	logger.trace(`MongoDB URI: ${MONGO_URI}`);
	logger.trace(`MongoDB DB: ${MONGO_DB}`);
	try {
		await mongoose.connect(MONGO_URI, {
			dbName: MONGO_DB,
		});
		logger.info('Connected to MongoDB');
	} catch (error) {
		logger.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}
}


module.exports = {
	PORT,
	connectToMongoDB,
	jwt: {
		secret: JWT_SECRET,
		expiration: JWT_EXPIRATION,
	},
	apiIgnorePaths,
	LOG_LEVEL,
	logger,
};
