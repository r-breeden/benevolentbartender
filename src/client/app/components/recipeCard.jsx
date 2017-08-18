import React from 'react';
import ReactDOM from 'react-dom';


export class RecipeCard extends React.Component{
  render(){
    return(
      <ul>
        <li>  {this.props.recipe.name}  </li>
        <li> {this.props.recipe.imageUrl} </li>
        <li> {this.props.recipe.ingredients} </li>
      </ul>
    );
  }
}