const Transactions = require('../../schemas/transactions');
const { NOT_FOUND } = require('../../common/constants/httpCodes');

const getFiltredTransactionsModel = async ({ serchData, condition }) => {
	try {
		switch (condition) {
			case 'Address':
				const dataTo = await Transactions.find({
					$or: [{ to: serchData }, { from: serchData }],
				})
					.sort({ blockNumber: -1 })
					.limit(1000);
				return dataTo;
			case 'ID transaction':
				const dataId = await Transactions.find({ hash: serchData })
					.sort({ blockNumber: -1 })
					.limit(1000);
				return dataId;
			case 'Block Number':
				const dataNum = await Transactions.find({
					blockNumber: serchData,
				})
					.sort({ blockNumber: -1 })
					.limit(1000);
				return dataNum;
			default:
				return;
		}
	} catch (err) {
		throw new Error(NOT_FOUND);
	}
};

module.exports = getFiltredTransactionsModel;
