const router = require('express').Router();
const jwt = require('jsonwebtoken');
const init = require('../init');

// hardcoded credentials
// username: admin
// password: 123123123
router.post('/login', (req, res) => {
	try {
		const { username, password } = req.body;

		if (
			!username ||
			!password ||
			username !== 'admin' ||
			password !== '123123123'
		) return res.status(400).json({ message: 'Invalid credentials' });

		const token = jwt.sign({ username }, init.jwt.secret, { expiresIn: init.jwt.expiration });

		res.json({ token: token });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error' });
	}
});

router.get('/verify', (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	if (!token) return res.status(401).json({ message: 'Unauthorized' });

	try {
		const decoded = jwt.verify(token, init.jwt.secret);
		console.log(decoded);
		res.json({ message: 'Token verified', decoded });
	} catch (error) {
		console.log(error);
		res.status(401).json({ message: 'Unauthorized' });
	}
});

module.exports = router;