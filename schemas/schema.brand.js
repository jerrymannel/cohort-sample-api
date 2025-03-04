const schema = require('mongoose').Schema;

const definition = {
	"_id": String,
	"name": {
		"type": String,
		"required": true,
		"unique": true,
	},
	"logo": {
		"type": String
	},
	"_metadata": {
		"createdAt": {
			"type": Date,
			"default": new Date()
		},
		"lastUpdatedAt": {
			"type": Date,
			"required": true,
		},
		"updatedBy": {
			"type": String,
			"required": true,
		},
		"isDeleted": {
			"type": Boolean,
			"default": false,
		},
		"version": {
			"type": Number,
			"default": 1
		}
	}
};

module.exports = schema(definition);