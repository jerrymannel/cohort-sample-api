const { v4: uuidv4 } = require('uuid');
function generateId() {
	return uuidv4();
}

function createMetadata(req) {
	return {
		"createdAt": new Date(),
		"lastUpdatedAt": new Date(),
		"updatedBy": req.user,
		"isDeleted": false,
		"version": 1
	};
}

function updateMetadata(req, metadata) {
	metadata.lastUpdatedAt = new Date();
	metadata.updatedBy = req.user;
	metadata.version = metadata.version + 1;
	return metadata;
}

module.exports = {
	createMetadata,
	updateMetadata,
	generateId,
};