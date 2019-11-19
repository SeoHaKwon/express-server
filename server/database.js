const mysql = require('mysql2/promise');

class dbConnClass {
    constructor() {
        this.dbInfo = mysql.createPool({
            host: '',
            port: 3306,
            user: '',
            password: '',
            database: '',
            multipleStatements: true
        });
    }

    /**
    * ¾ð¾î ÀÔ·Â
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
