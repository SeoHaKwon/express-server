const walletController = require('../controllers/wallet.controller');

module.exports = async (req, res) => {
    var proc = req.params.proc;
    // get
    var params = req.query;
	if(Object.keys(params).length === 0){
		params = req.body.data;
		if (!params) {
			console.log('this parameters undefineds!');
			res.json({Code : 401});
			return false;
		} else if(params.label === '' || params.pass === '') {
			res.json({Code : 402});
			return false;
		}
	} else if (params.label === '' || params.pass === '') {
		console.log(params, ' : this null data ');
		res.json({Code : 402});
		return false;
	}
	if (proc === 'create')
	{
		
		const wCreate = await walletController.createWallets(params);
		console.log(wCreate);
		if (wCreate) {
			res.json(wCreate);
		} else {
			res.json({Code : 403});
		}
	} else if (proc === 'balance')
	{
		const balance = await walletController.getBalance(params);
		console.log(balance);
		if (balance) {
			res.json(balance);
		} else {
			res.sendStatus(400);
		}
	} else if (proc === 'getTxid')
	{
		const Txid = await walletController.getTransactionId(params);
		res.json(Txid);
		//req.io.emit('Txid', Txid);
	} else if (proc === 'getBlock')
	{
		const blockHash = await walletController.getBlockHash(params);
//		req.io.emit('block', blockHash);
	} else if (proc === 'getSend')
	{
		const getSend = await walletController.getSend(params);
		res.json(getSend);
	}else {
		res.sendStatus(400);
	}
}
