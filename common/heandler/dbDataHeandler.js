const axios = require('axios');
const Web3 = require('web3');

const CurrentBlock = require('../../schemas/currentBlock');
const Transactions = require('../../schemas/transactions');

const ETH_SCAN_TOKEN = process.env.ETH_SCAN_TOKEN;
const INFURA_TOKEN = process.env.INFURA_TOKEN;

const web3 = new Web3(`https://mainnet.infura.io/v3/${INFURA_TOKEN}`);

const getData = async (blockNumber) => {
	try {
		const transactionsData = await axios.get(
			`https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${blockNumber}&boolean=true&apikey=${ETH_SCAN_TOKEN}`
		);
		const { transactions, timestamp, baseFeePerGas } =
			transactionsData.data.result;
		const date = new Date();
		const dateBlock = parseInt(timestamp, 16);
		const parsedDataArr = transactions.map((txn) => {
			return {
				hash: txn.hash,
				from: txn.from,
				to: txn.to,
				blockNumber: parseInt(txn.blockNumber),
				date: `${date.toDateString(dateBlock).split(' ')[1]}-${
					date.toDateString(dateBlock).split(' ')[2]
				}-${date.getFullYear(dateBlock)}`,
				value: txn.value,
				gasUsed: null,
				baseFee: baseFeePerGas,
				maxFee: txn.maxPriorityFeePerGas,
				gasPrice: txn.gasPrice,
				type: txn.type,
			};
		});
		return parsedDataArr;
	} catch (err) {
		throw new Error(err);
	}
};

const dbDataHeandler = async () => {
	try {
		const getBlockCurrentBlock = await axios.get(
			`https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=${ETH_SCAN_TOKEN}`
		);
		const { result } = getBlockCurrentBlock.data;
		const currentBlock = await CurrentBlock.findOne({
			name: 'current_eth_block',
		});

		if (!currentBlock) {
			const parsedTransactions = await getData(result);
			parsedTransactions.forEach(async (element) => {
				try {
					const txnData = await web3.eth.getTransactionReceipt(
						element.hash
					);
					if (txnData.gasUsed) {
						element.gasUsed = txnData.gasUsed;
					}
					await Transactions.create(element);
				} catch (err) {
					console.log(message);
				}
			});
			await CurrentBlock.create({
				name: 'current_eth_block',
				blockNumber: result,
			});
			return setTimeout(() => {
				return dbDataHeandler();
			}, 5000);
		}
		if (parseInt(result, 16) !== parseInt(currentBlock.blockNumber, 16)) {
			const parsedTransactions = await getData(result);
			parsedTransactions.forEach(async (element) => {
				try {
					const txnData = await web3.eth.getTransactionReceipt(
						element.hash
					);
					if (!txnData.gasUsed) {
						element.gasUsed = '0';
					} else {
						element.gasUsed = txnData.gasUsed;
					}
					await Transactions.create(element);
				} catch ({ message }) {
					console.log(message);
				}
			});
			await CurrentBlock.findOneAndUpdate(
				{
					name: 'current_eth_block',
				},
				{
					blockNumber: result,
				}
			);
			return setTimeout(() => {
				return dbDataHeandler();
			}, 5000);
		}
		return setTimeout(() => {
			return dbDataHeandler();
		}, 5000);
	} catch (e) {
		console.log('ERROR: ', e.message);
		console.log('will restart in 10 sec');
		return setTimeout(() => {
			return dbDataHeandler();
		}, 10000);
	}
};

module.exports = dbDataHeandler;
