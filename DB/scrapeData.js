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
<<<<<<< Updated upstream
const fs = require('file-system');
const Promise = global.Promise;
// const db = require('index.js');

=======
const Promise = require('bluebird');
const db = require('./index.js');
>>>>>>> Stashed changes

var writeJSON = (fileName, data) => {

  fs.writeFile(path.join('./savedData',fileName), data, 'utf-8', (err) => {
    if (err) {
      console.log('Error Saving Data for ', fileName)
    } else {
      console.logsh ('File has been Saved for ', fileName)
    }
<<<<<<< Updated upstream
  })
=======
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
>>>>>>> Stashed changes

}

/** Object/Ingredient Name is Required to Pull API Correctly **/
var getDrinks = function(ingredient) {
  
  /** EndPoint to Get Drinks per Each Ingredient **/ 
  var url = 'http://www.thecocktaildb.com/api/json/v1/1/filter.php'
  var options = {
    contentType: 'application/json',
<<<<<<< Updated upstream
    params: {i: ingredient}
  }
=======
    params: {i: ingredient.replace("'","\\'")},
  };
>>>>>>> Stashed changes

/** Option to either write locally or to save to DB **/ 

  return axios.get(url, options)
  .then((res) => {
<<<<<<< Updated upstream
    var data = JSON.stringify(res.data);
    //db.insertDrinks(data);
    writeJSON(ingredient.toLowerCase().replace(' ','_')+'_drinks.csv', data);
  })
  .catch((err) => {
    console.log('API Call Rejected ', err);
  })
=======
    var data = res.data;
    if (data.drinks === undefined) {
      console.log(res)
    }
    return sqlDrinkFormat(data);
      
    // var data = JSON.stringify(res.data);
    // writeJSON(ingredient.toLowerCase().replace(' ', '_') + '_drinks.json', data);
  })
  .catch((err) => {
    console.log('Error Retrieving Data ', err, err.headers);
  });

};

var getRecipeInfo = function(id) {

  /** EndPoint to Get Drinks All Info **/ 
  var url = 'http://www.thecocktaildb.com/api/json/v1/1/lookup.php';
  var options = {
    contentType: 'application/json',
    params: {i: id}
  };

/** Option to either write locally or to save to DB **/ 
/** Combines the response into a DB friendly format **/
  return axios.get(url, options)
  .then((res) => {

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
    return err;
  });
>>>>>>> Stashed changes

}

/** Invocation of Code **/ 
/** Iteration for each ingredient in the object item **/ 
<<<<<<< Updated upstream
for (var i = 0; i < datalist.drinks.length; i ++) {
  var promiseList = [];
  promiseList.push(getDrinks(datalist.drinks[i].strIngredient1));
}

Promise.all(promiseList)
  .then((values) => {
    console.log('Saved All Files');
  })
  .then(()=>{
    
  })
  .catch((reason) => {
    console.log(reason);
  })
=======
/** Once all Drinks Have Been Inserted Extract all Drink Ids **/
/** Iterate through all DrinkIds and Update All Drink into DB **/ 
var init = function () {

  //Refactor to await && convert getIngredientList.sh to a promise request
  /** Use the ingredient list to iterate **/
  /** Insert each ingredient into the DB and return promise request to grab eac **/
  /**  **/
  Promise.map(datalist.drinks ,(drink) => {
    db.addIngredient(drink.strIngredient1.replace("'","\\'"));
    return getDrinks(drink.strIngredient1);
  },{concurrency: 75})
  .then((results) => {
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

>>>>>>> Stashed changes

