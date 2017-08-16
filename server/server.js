var express = require('express');
var axios = require('axios');
const bodyParser = require('body-parser');
const db = require('../DB');

var app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../src/client/public'));

app.get('/recipes', (req, res) => {
  //assuming req.body is a string
  db.getRecipes(req.body, (err, data)=>{
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/getRecipes', (req, res) => { 
  console.log('HELLO', req.body);
  var ingredientsList = '';
  for (var i = 0; i < req.body['array[]'].length; i++){
    if ( i === req.body['array[]'].length -1 ){
      ingredientsList += req.body['array[]'][i];
    } else {
      ingredientsList += req.body['array[]'][i] + ',';
    }
  }

  db.getRecipes(ingredientsList, function(err, data){
    if ( err ) { 
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  })
});

app.get('/ingredients', (req, res) => {
  db.getIngredients(function(err, data){
    if( err ) { res.status(500).send(err); }
    console.log('RYAN', data);
    res.send(data);
  })
});

app.post('/recipes', (req, res) => {
  //assuming req.body is a string
  console.log('hiya', req.body);

  var fakeData = {
    ingredients: ['lemon', 'tequila', 'salt', 'regret'],
    name: 'magarita',
    instructions: 'How to make a margarita instructions',
    url: 'hi, I should be a photo url'
  }

  res.send(fakeData);
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
