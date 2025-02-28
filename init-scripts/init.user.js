const crypto = require('crypto');
const mongoose = require("mongoose");
const logger = require('../init').logger

const userModel = mongoose.model("user");

let adminUser = {
	"_id": "admin",
	"name": "Admin",
	"email": "admin@smileworks.com",
	"password": "123123123",
	"salt": null
};

async function addUser(user) {
	let data = await userModel.findById(user._id);
	if (data) {
		logger.debug(`User exists : ${user._id}`);
		return
	}
	logger.info(`Adding user : ${user._id}`);
	user.salt = Date.now();
	user.password = crypto.createHash('sha256').update(user.password + user.salt).digest('hex');
	await userModel.create(user);
	logger.info(`Added user : ${user._id}`);
}



module.exports = async () => {
	await addUser(adminUser);
}