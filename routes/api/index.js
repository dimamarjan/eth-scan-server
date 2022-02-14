const express = require('express');
const router = express.Router();

router.use('/blocks', require('./blocks/blocks'));
router.use('/transactions', require('./transactions/transactions'));

module.exports = router;
