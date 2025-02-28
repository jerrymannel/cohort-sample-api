const router = require('express').Router();
const jwt = require('jsonwebtoken');
const init = require('../init');
const logger = init.logger;

// hardcoded credentials
// username: admin
// password: 123123123
router.post('/login', (req, res) => {
	logger.debug(`Login attempt`);
	try {
		const { username, password } = req.body;
		logger.trace(`Login attempt with username: ${username} and password: ${password}`);

		if (
			!username ||
			!password ||
			username !== 'admin' ||
			password !== '123123123'
		) {
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