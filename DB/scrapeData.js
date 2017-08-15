/**
  IngredientsList is the last cURL pull from the API to generate the full list of data.
  Path is utilized to determine where fs will save
  Axios is utilized to create a request to the API to save
  fs is used to help save data back into the same location for our DB. 
**/

const datalist = require('./ingredientsList.json');
const path = require('path');
const axios = require('axios');
const fs = require('file-system');
const Promise = global.Promise;


var writeJSON = (fileName, data) => {

  fs.writeFile(path.join('./savedData',fileName), data, 'utf-8', (err) => {
    if (err) {
      console.log('Error Saving Data for ', fileName)
    } else {
      console.logsh ('File has been Saved for ', fileName)
    }
  })

}

/** Object/Ingredient Name is Required to Pull API Correctly **/
var getDrinks = function(ingredient) {
  
  /** EndPoint to Get Drinks per Each Ingredient **/ 
  var url = 'http://www.thecocktaildb.com/api/json/v1/1/filter.php'
  var options = {
    contentType: 'application/json',
    params: {i: ingredient}
  }

  return axios.get(url, options)
  .then((res) => {
    var data = JSON.stringify(res.data)
    writeJSON(ingredient.toLowerCase().replace(' ','_')+'_drinks.csv', data);
  })
  .catch((err) => {
    console.log('API Call Rejected ', err);
  })

}

/** Invocation of Code **/ 
/** Iteration for each ingredient in the object item **/ 
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

