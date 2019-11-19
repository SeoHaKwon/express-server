const wallet = require('../model/wallet.models');

class ControllerClass {
    constructor() {
	//	var errMsg = 'error';
    }

	async createWallets (params)
	{
		const result = await wallet.createWallets(params);
		console.log(result);
		let resp;
		if (result === 'error') {
			resp = { Code : 400 };
		}
		else {
			resp = { Code : 200 , walletAddress : result };
		}
	
	if(result){
            return resp;
        }else{
            return 'error';
        }
	};

	async getBalance (params)
	{
		const res = await wallet.getBalance(params);
		let resp = { price : res };
		let temp = JSON.stringify(resp);
	if(res){
            return temp;
        }else{
            return 'error';
        }

	};

	async getTransactionId (params)
	{
		const res = await wallet.getTransactionId(params); 
		console.log(res);

	if(res){
            return res;
        }else{
            return 'error';
        } 

	};

	async getBlockHash (params)
	{
		const result = await wallet.getBlockHash(params);
	if(result.res){
            return result;
        }else{
            return errmsg;
        }
	};

	async getSend (params)
	{
		const res = await wallet.getSend(params);
		console.log(res);
		if(res)
		{
			return res;
		} else {
			return 'error';
		}
	};

}

const Controller = new ControllerClass();
module.exports = Controller;
