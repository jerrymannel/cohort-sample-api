const express = require('express');
const init = require('./init');

const PORT = init.PORT;

const app = express();
app.use(express.json());

const greetRouter = require('./routes/router.greet');
app.use('/api/greet', greetRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

