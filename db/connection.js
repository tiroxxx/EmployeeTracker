// connecting to my database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Christian41!",
    database: "employeetracker_db"
});

connection.connect(function (err){
    if (err) throw err;

    start();
});

module.exports = connection;