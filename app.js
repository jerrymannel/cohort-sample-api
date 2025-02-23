const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// GET /
// Return "Hello World"
app.get('/greet', (req, res) => {
	res.send('Hello World');
});

app.post('/greet', (req, res) => {
	const { name } = req.body;
	if (!name) {
		return res.status(400).json({ error: 'Name is required' });
	}
	res.json({ message: `Hello ${name}` });
});

app.get('/greet/:name', (req, res) => {
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

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

