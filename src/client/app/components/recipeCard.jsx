import React from 'react';
import ReactDOM from 'react-dom';


export class RecipeCard extends React.Component{
  // var title = 'title';
  // var description = 'description';
  // var image = 'https://images.vexels.com/media/users/3/128345/isolated/lists/d10d4b63b0d338819ffb795b187c618f-orange-drink-glass-icon.png';

  render(){
    return(
      <div class='recipeCard'>
        <span>  title  </span>
        <span> image </span>
        <span> description </span>
      </div>
    );
  }
}