const mysql = require('mysql2/promise');

class dbConnClass {
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

    /**
    * 언어 입력
    * @param {Object} params
    */
    async getDb() {
        try {
            const connection = await this.dbInfo.getConnection(async conn => conn);
            return connection;
        } catch (err) {
            console.log('DB Error');
            return false;
        }
    };
}
const dbConn = new dbConnClass();
module.exports = dbConn;