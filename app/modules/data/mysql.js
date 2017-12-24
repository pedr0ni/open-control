const mysql = require('mysql');

var con = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: 'open-control'
});

con.connect();

module.exports = {

    db: function() {
        return con;
    },
    close: function() {
        con.end();
        con = null
    }

}
