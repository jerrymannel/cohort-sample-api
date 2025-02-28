const jwt = require('jsonwebtoken');
const init = require('../init');

function verifyToken(req, res, next) {
	if (init.apiIgnorePaths.includes(req.path)) return next();

	const token = req.headers.authorization;
	if (!token) return res.status(401).json({ message: 'Unauthorized' });

	const components = token.split(' ');
	if (components.length !== 2 || components[0] !== 'JWT')
		return res.status(401).json({ message: 'Unauthorized' });

	const decoded = jwt.verify(components[1], init.jwt.secret);
	if (!decoded) return res.status(401).json({ message: 'Unauthorized' });
	req.user = decoded;

	next();
}

module.exports = {
	verifyToken,
};
