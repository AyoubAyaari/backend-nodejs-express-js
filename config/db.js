const mysql = require ('mysql')

const db =mysql.createPool({
    host:'localhost',
    username:'root',
    password:'',
    database:'smartauction',
    


});
db.getConnection((error, connection) => {
    if (error) {
        console.error('Error connecting to the database:', error.message);
    } else {
        console.log("connected to the database");
          // Release the connection when done with it
    }
});
module.exports=db;