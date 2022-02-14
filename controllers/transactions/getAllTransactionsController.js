const { OK } = require('../../common/constants/httpCodes');
const { getTransactionsModel } = require('../../model');
require('dotenv').config();

TOKEN = process.env.ETH_SCAN_TOKEN;

const getAllTransactionsController = async (_, res, next) => {
	try {
		const data = await getTransactionsModel();
		return res.json({
			status: 'succsess',
			code: OK,
			data,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = getAllTransactionsController;
