const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

const MONGO_URI = process.env.MONGO_CONNECTION_STRING || "mongodb://localhost:27017?directConnection=true";
console.log(MONGO_URI);
const MONGO_DB = process.env.MONGO_DB_NAME || 'cohort-sample-app';
console.log(MONGO_DB);

async function connectToMongoDB() {
	console.log('Connecting to MongoDB');
	try {
		await mongoose.connect(MONGO_URI, {
			dbName: MONGO_DB,
		});
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}
}

const JWT_SECRET = process.env.JWT_SECRET || '123123123';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

const apiIgnorePaths = ['/api/auth/login'];

module.exports = {
	PORT,
	connectToMongoDB,
	jwt: {
		secret: JWT_SECRET,
		expiration: JWT_EXPIRATION,
	},
	apiIgnorePaths,
};
