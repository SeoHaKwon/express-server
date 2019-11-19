const mysql = require('mysql2/promise');

class dbClass {
    constructor() {
	this.dbInfo = mysql.createPool({
            host: '45.119.145.123',
            port: 3306,
            user: 'samadal',
            password: 'samadal',
            database: 'projectM',
            multipleStatements: true
        });
    }
   	 async getDb() {
   	     try {
    	        const connection = await this.dbInfo.getConnection(async conn => conn);
     	       	return connection;
     	     } catch (err) {
          	 console.log('DB Error');
           	 return false;
             }
    	};
	async cashInsertQuery (nickName, Address)
        {
                let connection = await this.getDb();
                connection.connect();
                let sql = 'INSERT INTO wallets (nick, address) VALUES (?, ?)';
                let param = [nickName, Address];
                connection.query(sql, param, function(err, rows, fields) {
                        if (err) {
                                return err;
                        } else {
                                return rows.insertId;
                        }
                });
        }
	async cashSelectQuery (nickName)
	{
		let connection = await this.getDb();
		connection.connect();
		let sql = "SELECT * from wallets WHERE nick='" + nickName + "'";
//		let params = [nickName];
		let result = await connection.query(sql);
		return result[0].length;
	}
}
const dbConn = new dbClass();
module.exports = dbConn;
