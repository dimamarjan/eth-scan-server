const express = require('express');
const router = express.Router();
const controllers = require('../../../controllers');

router.get('/', controllers.getAllTransactionsController);
router.post('/', controllers.getFiltredTransactionsController);

module.exports = router;
