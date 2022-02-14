const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const transactionsSchema = new Schema(
	{
		hash: {
			type: String,
		},
		from: {
			type: String,
		},
		to: {
			type: String,
		},
		blockNumber: {
			type: String,
		},
		date: {
			type: String,
		},
		value: {
			type: String,
		},
		gasUsed: {
			type: String,
		},
		baseFee: {
			type: String,
		},
		maxFee: {
			type: String,
		},
		gasPrice: {
			type: String,
		},
		type: {
			type: String,
		},
	},
	{
		versionKey: false,
		toJSON: {
			virtuals: true,
			transform: function (_, ret) {
				delete ret._id;
				delete dataType;
				return ret;
			},
		},
	}
);

transactionsSchema.plugin(mongoosePaginate);

const Transactions = model('Transactions', transactionsSchema);

module.exports = Transactions;
