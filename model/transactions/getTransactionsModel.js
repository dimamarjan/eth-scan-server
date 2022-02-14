const Transactions = require('../../schemas/transactions');
const { NOT_FOUND } = require('../../common/constants/httpCodes');

const getTransactionsModel = async () => {
	try {
		const transactions = await Transactions.find()
			.sort({ blockNumber: -1 })
			.limit(1000);
		return transactions;
	} catch (err) {
		console.log(err);
		throw new Error(NOT_FOUND);
	}
};

module.exports = getTransactionsModel;
