const jwt = require('jsonwebtoken');
const init = require('../init');
const logger = init.logger;

function verifyToken(req, res, next) {
	logger.debug(`Verifying token for path ${req.path}`);
	if (init.apiIgnorePaths.includes(req.path)) {
		logger.debug(`Path ${req.path} is ignored`);
		return next();
	}

	const token = req.headers.authorization;
	if (!token) {
		logger.error(`No token provided`);
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const components = token.split(' ');
	if (components.length !== 2 || components[0] !== 'JWT') {
		logger.error(`Invalid token format`);
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const decoded = jwt.verify(components[1], init.jwt.secret);
	if (!decoded) {
		logger.error(`Invalid token`);
		return res.status(401).json({ message: 'Unauthorized' });
	}

	logger.trace(`Token verified`);
	req.user = decoded.username;
	logger.debug(`User decoded: ${JSON.stringify(req.user)}`);

	next();
}

module.exports = {
	verifyToken,
};
