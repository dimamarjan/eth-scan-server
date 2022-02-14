const { OK } = require('../../common/constants/httpCodes');
const { getFiltredTransactionsModel } = require('../../model');
require('dotenv').config();

TOKEN = process.env.ETH_SCAN_TOKEN;

const getFiltredTransactionsController = async (req, res, next) => {
	try {
		const data = await getFiltredTransactionsModel(req.body);
		return res.json({
			status: 'succsess',
			code: OK,
			data,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = getFiltredTransactionsController;
