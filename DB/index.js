const mysql = require('mysql');
const mysqlConfig = require('./config');

var connection = mysql.createConnection(mysqlConfig);

var getRecipes = (ingStr, cb) => {
  //split string
  var ingArr = ingStr.split(',');
  //create query string
  var queryStr = `SELECT * FROM recipes WHERE ingStr LIKE '%${ingArr[0]}%'`;
  for (var i = 1; i < ingArr.length; i++) {
    queryStr += ` AND ingStr LIKE '%${ingArr[i]}%'`; 
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

  connection.query(`SELECT * FROM recipes WHERE name = '${name}'`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });

};

var addIngredient = (name) => {

  connection.query(`INSERT INTO ingredients (name) VALUES ('${name}')`, (err, results) => {
    if (err) {
      console.log(err, null);
    } else {
      console.log(null, results);
    }
  });

};

// duplicates should be handled by unique contraint on name field?
var addRecipe = (recipeObj) => {

  var queryStr = `INSERT INTO recipes (name, instructions, ingredients, measurements, imageUrl) 
  VALUES ('${recipeObj.name}', '${recipeObj.instructions}', '${recipeObj.ingredients}', '${recipeObj.measurements}', '${recipeObj.imageUrl}')`;

  connection.query(queryStr, (err, results) => {
    if (err) {
      console.log(err, null);
    } else {
      console.log(null, results);
    }
  });

};

//assumes input of a string(name) & an object with properties named for fields to be updated w/ the values to replace current
//can be updated later if this needs to be changed
var editRecipe = (name, fieldObj) => {
  //create query string
  var queryStr = `UPDATE recipes SET `;
  for (var key in fieldObj) {
    queryStr += `${key} = '${fieldObj[key]}', `;
  }
  var completeQuery = `${queryStr.slice(0, -2)} WHERE name = '${name}'`;

  connection.query(completeQuery, (err, results) => {
    if (err) {
      console.log(err, null);
    } else {
      console.log(null, results);
    }
  }); 

};

var deleteRecipe = (name) => {

  connection.query(`DELETE FROM recipes WHERE name = ${name}`, (err, results) => {
    if (err) {
      console.log(err, null);
    } else {
      console.log(null, results);
    }
  });

};

getIngredients = (cb) => {

  connection.query('SELECT name FROM ingredients', (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });

};

module.exports = {
  getRecipes, grabNamedRecipe, addIngredient, addRecipe, editRecipe, deleteRecipe, getIngredients
};