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

app.get('/ingredients', (req, res) => {
  var fakeDataIngredients = {ingredients: ['one', 'two', 'three', 'four']};
  res.send(fakeDataIngredients);
});

app.post('/recipes', (req, res) => {
  //assuming req.body is a string

  var fakeData = {
    ingredients: ['lemon', 'tequila', 'salt', 'regret'],
    name: 'magarita',
    instructions: 'How to make a margarita instructions',
    url: 'hi, I should be a photo url'
  }

  res.send(fakeData);
  // db.getRecipes(req.body, (err, data)=>{
  //   if (err) {
  //     res.status(500).send(err);
  //   } else {
  //     console.log('')
  //     res.status(200).send(data);
  //   }
  // });
});

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
