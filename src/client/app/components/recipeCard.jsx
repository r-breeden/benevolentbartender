import React from 'react';
import ReactDOM from 'react-dom';


export class RecipeCard extends React.Component{
  render(){
    return(
      <ul className="card">
        <li className="cardTextBGcolor">  {this.props.recipe.name}  </li>
        <li className="cardTextBGcolor"> {this.props.recipe.imageUrl} </li>
        <li className="cardTextBGcolor"> {this.props.recipe.ingredients} </li>
      </ul>
    );
  }
}