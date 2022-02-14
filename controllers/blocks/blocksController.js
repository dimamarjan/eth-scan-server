const { getLastBlockModel } = require('../../model');
const { OK } = require('../../common/constants/httpCodes');
require('dotenv').config();

TOKEN = process.env.ETH_SCAN_TOKEN;

const blocksController = async (_, res, next) => {
	try {
		const data = await getLastBlockModel();
		return res.json({
			status: 'succsess',
			code: OK,
			data,
		});
	} catch (err) {
		next(err);
	}
};

module.exports = blocksController;
