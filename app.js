const express = require('express');
const init = require('./init');
const logger = init.logger;

const PORT = init.PORT;

const app = express();
app.use(express.json());

const { verifyToken } = require('./lib/middleware.auth');
const apiLogger = require('./lib/middleware.apiLogger');

app.use(apiLogger);
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
		logger.info(`Server is running on port ${PORT}`);
	});
})();

