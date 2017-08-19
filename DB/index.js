const mysql = require('mysql');
const mysqlConfig = require('./config');

var connection = mysql.createConnection(mysqlConfig);

/**
 * 
 * query database for recipes using a string of ingredients separated by commas  
 */
var getRecipes = (ingStr, cb) => {
  var ingArr = ingStr.split(',');
  var queryStr = `SELECT * FROM recipes WHERE ingredients LIKE '%${ingArr[0]}%'`;
  for (var i = 1; i < ingArr.length; i++) {
    queryStr += ` AND ingredients LIKE '%${ingArr[i]}%'`; 
  }
  
  connection.query(queryStr, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

/**
 * 
 * query database for a single recipe based on a given name 
 */
var grabNamedRecipe = (name, cb) => {

  connection.query(`SELECT * FROM recipes WHERE name = '${name}'`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });

};

/**
 * 
 * insert an ingredient into the ingredients table  
 */
var addIngredient = (name) => {

  connection.query(`INSERT INTO ingredients (name) VALUES ('${name}')`, (err, results) => {
    if (err) {
      console.log(err, null);
    } else {
      console.log(null, results);
    }
  });

};

/**
 * 
 * insert an recipe into the recipes table   
 */
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

/**
 * 
 * change fields in a recipe of given name 
 * fieldObj should contain properties and values that correspond to fields to be updated and the values to be inserted
 */
var editRecipe = (name, fieldObj) => {

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

/**
 * 
 * delete a recipe of a given name
 */
var deleteRecipe = (name) => {

  connection.query(`DELETE FROM recipes WHERE name = '${name}'`, (err, results) => {
    if (err) {
      console.log(err, null);
    } else {
      console.log(null, results);
    }
  });

};

/**
 * 
 * return all ingredients from ingredients table 
 */
var getIngredients = (cb) => {

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