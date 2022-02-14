const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const currentBlockSchema = new Schema(
	{
		name: {
			type: String,
		},
		blockNumber: {
			type: String,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform: function (_, ret) {
				delete ret._id;
				delete ret.name;
				return ret;
			},
		},
	}
);

currentBlockSchema.plugin(mongoosePaginate);

const CurrentBlock = model('CurrentBlock', currentBlockSchema);

module.exports = CurrentBlock;
