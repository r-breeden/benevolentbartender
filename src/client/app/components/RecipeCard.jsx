import React from 'react';
import ReactDOM from 'react-dom';

/**
* Renders recipes 
* Props: recipe.name, recipe.imageUrl, recipe.ingredients
*/

export class RecipeCard extends React.Component {
  render() {
    return (
      <ul className="card">
        <div className="cardInfo">
          <li className="cardTextBGcolor header">{this.props.recipe.name}</li>
          <li className="cardTextBGcolor">{this.props.recipe.imageUrl}</li>
          <div className="cardTextBGcolor cardIngredHeader">INGREDIENTS</div>
          <li className="cardTextBGcolor">{this.props.recipe.ingredients}</li>
        </div>
      </ul>
    );
  }
}