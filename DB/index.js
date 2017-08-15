const mysql = require('mysql');
const mysqlConfig = require('./config');

var connection = mysql.createConnection(mysqlConfig);

var getRecipes = (ingStr, cb) => {
  //split string
  var ingArr = ingStr.split(',');
  //create query string
  var queryStr = `SELECT * FROM recipes WHERE ingStr LIKE %${ingArr[0]}%`;
  for (var i = 1; i < ingArr.length; i++) {
    queryStr += ` AND ingStr LIKE %${ingArr[i]}%`; 
  }
  //query db
  connection.query(queryStr, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

var grabNamedRecipe = (name, cb) => {

  connection.query(`SELECT * FROM recipes WHERE name = ${name}`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });

};

module.exports = {getRecipes, grabNamedRecipe};