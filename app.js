const express = require('express');
const init = require('./init');
const logger = init.logger;

const app = express();
app.use(express.json());

const { verifyToken } = require('./lib/middleware.auth');
const apiLogger = require('./lib/middleware.apiLogger');

app.use(apiLogger);
app.use(verifyToken);

const greetRouter = require('./routes/router.greet');
const userRouter = require('./routes/router.user');
const authRouter = require('./routes/router.auth');

(async () => {
	await init.connectToMongoDB();

	app.use('/api/greet', greetRouter);
	app.use('/api/users', userRouter);
	app.use('/api/auth', authRouter);


	app.listen(init.PORT, async () => {
		logger.info(`Server is running on port ${init.PORT}`);
		await require('./init-scripts/init.user')();
	});
})();

