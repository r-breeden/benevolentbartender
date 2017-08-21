import React from 'react';
import ReactDOM from 'react-dom';

/**
* Renders recipes 
* Props: recipe.name, recipe.imageUrl, recipe.ingredients
*/

export class RecipeCard extends React.Component {
  render() {
    //remove extra commas from ingredients and add a space after each ingredient
    var arr = [];
    var ingredients = this.props.recipe.ingredients;
    ingredients = ingredients.split(',');
    // console.log('***');
    // console.log(ingredients);
    for(var i = 0 ; i < ingredients.length; i++){
      if(ingredients[i] !== ''){
        arr.push(ingredients[i]);
      }
    }
    ingredients = arr.join(', ');


    return (
      <ul className="card">
        <div className="cardInfo">
          <li className="cardTextBGcolor header">{this.props.recipe.name}</li>
          <li className="cardTextBGcolor">{this.props.recipe.imageUrl}</li>
          <div className="cardTextBGcolor cardIngredHeader">INGREDIENTS</div>
          <li className="cardTextBGcolor">{ingredients}</li>
        </div>
      </ul>
    );
  }
}