const express = require('express');
const init = require('./init');

const PORT = init.PORT;

const app = express();
app.use(express.json());

const { verifyToken } = require('./lib/middleware.auth');

app.use(verifyToken);

const greetRouter = require('./routes/router.greet');
app.use('/api/greet', greetRouter);

const userRouter = require('./routes/router.user');
app.use('/api/users', userRouter);

const authRouter = require('./routes/router.auth');
app.use('/api/auth', authRouter);

(async () => {
	await init.connectToMongoDB();
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
})();

