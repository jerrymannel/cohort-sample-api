const init = require('../init');
const logger = init.logger;

function apiLogger(req, res, next) {
	const method = req.method;
	if (method === 'GET' && init.LOG_LEVEL === 'trace') {
		logger.trace(`${req.method} ${req.url}`);
	} else {
		logger.debug(`${req.method} ${req.url}`);
	}
	next();
}

module.exports = apiLogger;