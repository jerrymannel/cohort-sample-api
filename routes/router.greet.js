const express = require('express');
const logger = require('../init').logger;
const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello World');
});

router.post('/', (req, res) => {
	const { name } = req.body;
	logger.info(`Greeting ${name}`);
	if (!name) {
		logger.error('Name is required');
		return res.status(400).json({ error: 'Name is required' });
	}
	res.json({ message: `Hello ${name}` });
});

router.get('/:name', (req, res) => {
	const params = req.query;
	const { name } = req.params;
	logger.info(`Greeting ${name}`);

	if (params.uppercase) {
		message = `HELLO ${name.toUpperCase()}`;
	} else {
		message = `Hello ${name}`;
	}

	logger.trace(`Greeting ${message}`);
	res.json({ message });
});

module.exports = router;