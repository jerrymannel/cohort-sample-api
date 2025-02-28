const router = require('express').Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mongoose = require('mongoose');
const init = require('../init');
const logger = init.logger;

const userModel = mongoose.model('user');

router.post('/login', async (req, res) => {
	logger.debug(`Login attempt`);
	try {
		const { username, password } = req.body;
		if (!username || !password) {
			logger.error(`Username or password not provided`);
			return res.status(400).json({ message: "Invalid credentials" });
		}
		logger.trace(`Login attempt with username: ${username} and password: ${password}`);

		const user = await userModel.findOne({ _id: username });
		logger.trace(`User: ${JSON.stringify(user)}`);

		if (!user) {
			logger.error(`User not found`);
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		logger.trace("User found. Checking password")
		const hash = crypto.createHash('sha256').update(password + user.salt).digest('hex');
		if (hash !== user.password) {
			logger.error(`Invalid credentials`);
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ username }, init.jwt.secret, { expiresIn: init.jwt.expiration });
		logger.debug(`Token generated: ${token}`);
		logger.debug(`Token expiration: ${init.jwt.expiration}`);
		res.json({ token: token });
	} catch (error) {
		logger.error(`Error generating token: ${error}`);
		res.status(500).json({ message: 'Internal server error' });
	}
});

router.get('/verify', (req, res) => {
	logger.debug(`Verify token attempt`);
	const token = req.headers.authorization.split(' ')[1];
	if (!token) {
		logger.error(`No token provided`);
		return res.status(401).json({ message: 'Unauthorized' });
	}

	try {
		const decoded = jwt.verify(token, init.jwt.secret);
		logger.debug(`Token verified: ${JSON.stringify(decoded)}`);
		res.json({ message: 'Token verified', decoded });
	} catch (error) {
		logger.error(`Error verifying token: ${error}`);
		res.status(401).json({ message: 'Unauthorized' });
	}
});

module.exports = router;