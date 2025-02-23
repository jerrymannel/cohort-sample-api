const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello World');
});

router.post('/', (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ error: 'Name is required' });
	}
	res.json({ message: `Hello ${name}` });
});

router.get('/:name', (req, res) => {
	const params = req.query;
	const { name } = req.params;

	console.log(params);

	if (params.uppercase) {
		message = `HELLO ${name.toUpperCase()}`;
	} else {
		message = `Hello ${name}`;
	}

	res.json({ message });
});

module.exports = router;