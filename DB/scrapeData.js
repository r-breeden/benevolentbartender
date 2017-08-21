/**
  IngredientsList is the last cURL pull from the API to generate the full list of data. 
  npm run init-ingred will initialize the ingredients
  Path is utilized to determine where fs will save
  Axios is utilized to create a request to the API to save
  fs is used to help save data back into the same location for our DB. 
**/

// const fs = require('file-system');
const datalist = require('./ingredientsList.json');
const path = require('path');
const axios = require('axios');
const Promise = require('bluebird');
const db = require('./index.js');
const axiosRetry = require('axios-retry');

var writeJSON = (fileName, data) => {

  fs.writeFile(path.join('./savedData',fileName), data, 'utf-8', (err) => {
    if (err) {
      console.log('Error Saving Data for ', fileName)
    } else {
      console.logsh ('File has been Saved for ', fileName)
    }
  });

};

/** Parses out the required keys out into an array*/
/** Requires a drink object from the request **/
var sqlDrinkFormat = function(drinkObj) {
  
  var drinkList = drinkObj.drinks;
  try {
    return drinkList.map( (drink) => {
      var drinkArr = [];
      /** id, name, imageUrl */
      drinkArr.push(parseInt(drink.idDrink));
      drinkArr.push(drink.strDrink);
      drinkArr.push(drink.strDrinkThumb);
      return drinkArr;
    })
  }
  catch (err) {
    console.log('ERROR FOR ', drinkObj)
  }
};

/** Object/Ingredient Name is Required to Pull API Correctly **/
var getDrinks = function(ingredient) {
  
  /** EndPoint to Get Drinks per Each Ingredient **/ 
  var url = 'http://www.thecocktaildb.com/api/json/v1/3847/filter.php'
  var options = {
    contentType: 'application/json',
    params: {i: ingredient.replace("'","\\'")},
  };

/** Option to either write locally or to save to DB **/ 
  axiosRetry(axios, { retries: 3});

  return axios.get(url, options)
  .then((res) => {
    console.log('Success! Got Ingredient Data for', res.config.params.i)
    var data = res.data;
    if (data.drinks === undefined) {
      console.log('Error getting', res.config.params.i)
    }
    return sqlDrinkFormat(data);
      
    // var data = JSON.stringify(res.data);
    // writeJSON(ingredient.toLowerCase().replace(' ', '_') + '_drinks.json', data);
  })
  .catch((err) => {
    console.log('Error Retrieving Drink Data ', err);
  });

};

var getRecipeInfo = function(id) {

  /** EndPoint to Get Drinks All Info **/ 
  var url = 'http://www.thecocktaildb.com/api/json/v1/3847/lookup.php';
  var options = {
    contentType: 'application/json',
    params: {i: id}
  };

  axiosRetry(axios, { retries: 3});
/** Option to either write locally or to save to DB **/ 
/** Combines the response into a DB friendly format **/
  return axios.get(url, options)
  .then((res) => {
    console.log('Success! Received Response for All Recipe for', res.config.params.i)
    var drink = res.data.drinks[0];
    var ingArr = [];
    var measureArr = [];
    for (var i = 1; i < 16; i ++) {
      ingArr.push(drink['strIngredient' + i]);
      measureArr.push(drink['strMeasure' + i]);
    }
    ingArr = ingArr.join(',');
    measureArr = measureArr.join(',');
    /** id, instructions, ingredients, measurements **/
    var arr = [];
    arr.push(parseInt(drink.idDrink));
    arr.push(drink.strInstructions);
    arr.push(ingArr);
    arr.push(measureArr);
    return arr;

    // instructions: strInstructions,
    // ingredients: ingArr
    // measurements: measureArr,
   
    //NOT USED
    //category: data.strCategory,
    //isAlcoholic: data.strAlcoholic,
    //glass: data.strGlass,
    //insertDate: new Date(),
    //createdDate: data.dateModified

    // var data = JSON.stringify(res.data);
    // writeJSON(drinkId.toLowerCase().replace(' ', '_') + '_drink.json', data);
  })
  .catch((err) => {
    console.log('Failed to get Data',err);
    return err;
  });

}

/** Invocation of Code **/ 
/** Iteration for each ingredient in the object item **/ 
/** Once all Drinks Have Been Inserted Extract all Drink Ids **/
/** Iterate through all DrinkIds and Update All Drink into DB **/ 
var init = function () {

  //Refactor to await && convert getIngredientList.sh to a promise request
  /** Use the ingredient list to iterate **/
  /** Insert each ingredient into the DB **/
  /** Once Insert Complete, Grab all Unique Ids **/
  /** Create another array of request promises to get all drink info **/
  /** Update all drink recipes with new information  **/
  Promise.map(datalist.drinks ,(drink) => {
    db.addIngredient(drink.strIngredient1.replace("'","\\'"));
    return getDrinks(drink.strIngredient1);
  },{concurrency: 75})
  .then((results) => {
    console.log('Got the Results');
    return results.reduce( (prev,curr) => prev.concat(curr), [])
  })
  .then((list) => {
    return db.bulkInsertRecipes(list);
  })
  .then((message) => {
    console.log(message.message)
    return db.getAllRecipes();
  })
  .then((data) => {
    console.log('There are ', data.length, ' recipes' )
    return Promise.map(data, (item) => {
      return getRecipeInfo(item.id)
    }, {concurrency: 75})
  })
  .then((list) => {
    console.log('Updating', list.length, ' recipes');
    return db.bulkUpdateRecipes(list);
  })
  .then((message) => {
    console.log('Got All Data from Cocktails DB', message);
    process.exit(0);
  })
  .catch((reason) => {
    console.log('Error: ', reason);
    process.exit(1);
  })
};

init();


