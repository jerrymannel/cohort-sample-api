const router = require('express').Router();
const mongooseCrud = require('mongoose-express-middleware');
const schema = require('../schemas/schema.brand');
const init = require('../init');
const logger = init.logger;

const { createMetadata, updateMetadata, generateId } = require('../lib/metadataHandler');

const modelName = init.modelNames.brand;
const crud = new mongooseCrud(modelName, schema, null);

router.get("/", crud.find);
router.get("/:id", crud.findById)
router.get("/utils/count", crud.count)

router.post("/", async (req, res, next) => {
	try {
		let body = req.body;
		if (!body) return res.status(400).json({ message: 'Missing payload' });
		if (!body._id) body._id = generateId();
		const metadata = createMetadata(req);
		body._metadata = metadata;
		logger.trace(`Brand: ${JSON.stringify(body)}`);
		const responseData = await crud.create(req, res, next);
		res.status(200).json(responseData);
	} catch (error) {
		logger.error(`Error creating brand: ${error}`);
		res.status(500).json({ message: 'Internal server error' });
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		let body = req.body;
		if (!body) return res.status(400).json({ message: 'Missing payload' });

		const id = req.params.id;
		const existingData = await crud.model.findById(id);
		if (!existingData) return res.status(404).json({ message: 'Brand not found' });

		const metadata = updateMetadata(req, existingData._metadata);
		body._metadata = metadata;
		logger.trace(`Brand updated: ${req.params.id} : ${JSON.stringify(body)}`);
		const responseData = await crud.update(req, res, next);
		res.status(200).json(responseData);
	} catch (error) {
		logger.error(`Error updating brand: ${error}`);
		res.status(500).json({ message: 'Internal server error' });
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const id = req.params.id;
		const existingData = await crud.model.findById(id);
		if (!existingData) return res.status(200).end();
		const metadata = updateMetadata(req, existingData._metadata);
		existingData._metadata = metadata;
		existingData._metadata.isDeleted = true;
		logger.trace(`Brand deleted: ${req.params.id} : ${JSON.stringify(existingData)}`);
		req.body = existingData;
		await crud.update(req, res, next);
		res.status(200).end();
	} catch (error) {
		logger.error(`Error deleting brand: ${error}`);
		res.status(500).json({ message: 'Internal server error' });
	}
});

module.exports = router;