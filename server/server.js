const app = require('../app');
const db = require('../db/db');
const dbDataHeandler = require('../common/heandler/dbDataHeandler');

const PORT = process.env.PORT;

db.then(() => {
	app.listen(PORT, () => {
		console.log(`Server running on port: ${PORT}`);
		dbDataHeandler();
	});
}).catch((err) => {
	console.log(err);
});
