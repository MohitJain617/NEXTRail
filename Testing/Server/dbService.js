const mysql = requre('mysql');
const dotenv = requre('dotenv');
dotenv.config();
let instance = null;

// connecting to data
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    // console.log('db ' + connection.state);
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance: new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((resolve, reject)=> {
                //asking for this query from database
                const query = "SELECT * FROM time_table;";
                connection.query(query, (err, results) => {
                    if(err) reject (new Error(err.message));
                    resolve(results);
                });

                console.log(response);
            });
        } catch (error){
            console.log(error);
        }
    }
}

module.exports = DbService;
