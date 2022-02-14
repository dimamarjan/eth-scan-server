const CurrentBlock = require('../../schemas/currentBlock');
const { NOT_FOUND } = require('../../common/constants/httpCodes');

const getLastBlockModel = async () => {
	try {
		const block = await CurrentBlock.findOne({ name: 'current_eth_block' });
		block.blockNumber = parseInt(block.blockNumber, 16);
		return block;
	} catch {
		throw new Error(NOT_FOUND);
	}
};

module.exports = getLastBlockModel;
