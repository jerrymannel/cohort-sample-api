const schema = require('mongoose').Schema;

const definition = {
	"_id": String,
	"name": String,
	"password": String,
	"salt": String,
	"email": String,
	"phoneNumber": String,
	"address": {
		"street": String,
		"city": String,
		"state": String,
		"zip": String
	},
	"isActive": Boolean
};

module.exports = schema(definition);