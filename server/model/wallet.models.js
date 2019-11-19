//const db = require('../database');
const db = require('./dbClass');
// var BitGoJS = require('../BitGo/src/index.js');
var bitgo = new BitGoJS.BitGo({env: 'prod', accessToken:'v2x3d981a39a2a41b91c2ecbe6f00dd7e7ac16c397af692fba8c8cf48aa445ebdda'});

class ModelClass {
    constructor() {
    }

	async createWallets (params)
	{
		let iscon = await db.cashSelectQuery(params.label);
		if (iscon === 0) { 
			let temp = await bitgo.wallets().createWalletWithKeychains({ "passphrase": params.pass, "label": params.label, "enterprise": '5c7373eecf1749f17f5ff0706fc13350' });
                	let result = await db.cashInsertQuery(params.label, temp.wallet.id());
                	return temp.wallet.id();
		} else {
			return 'error';
		}

	}

	async getBalance (params)
	{
		/* get wallet */
		var _id = params._id;
		let results;
		results = await bitgo.wallets().get({type: 'bitcoin', id : _id});
		results = (results.balance() / 1e8).toFixed(4);
		return results;
	}

	async getTransactionId (params)
	{
		// List Transactions 처리
		var _id = params._id;
		let results;
		var arr = [];
		let wallet = await bitgo.wallets().get({type: 'bitcoin', id: _id});
		results = await wallet.transactions({}, function(err, result) {
		for (var index = 0; index < result.transactions.length; ++index) {
        		var tx = result.transactions[index];
        		var value = 0;
        		for (var entriesIndex = 0; entriesIndex < tx.entries.length; ++entriesIndex) {
          			if (tx.entries[entriesIndex].account === wallet.id()) {
           	 			value += tx.entries[entriesIndex].value;
          			}
        		}
        		var verb = (value > 0) ? 'Received' : 'Sent';
			let pend = (result.transactions[index].pending === true) ? '진행중' : '종료';
			let Vol = (value / 1e8).toFixed(8);
			let fee = result.transactions[index].fee;
			let confirmations = result.transactions[index].confirmations;
			let obj = {
				"Txid" : tx.id,
				"confirmations" : confirmations,
				"fee" : fee,
				"pending" : pend,
				"Verb" : verb,
				"Volume" : Vol,
				"Date" : tx.date
			};
	 		arr.push(obj);
      		}
		});
		return arr;
	}

	async getBlockHash (params)
	{
		// Confirmed Count 처리
	}

	async getSend (params)
	{
		let _id = params._id;
		let addr = params.addr;
		let acons = Number(params.acons);
		let pass = params.pass;
		let wallet = await bitgo.wallets().get({type:"bitcoin", id:_id});
		console.log(wallet,' : this is wallet info');
		console.log(acons, 'acons');
		var result = await wallet.sendCoins({ address: addr, amount: acons, walletPassphrase: pass });
		return result;
	}
 
}

const Model = new ModelClass();
module.exports = Model;
