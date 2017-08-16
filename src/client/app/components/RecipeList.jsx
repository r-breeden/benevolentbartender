import React from 'react';
import ReactDOM from 'react-dom';
import { RecipeCard } from './RecipeCard.jsx';
import $ from 'jquery';

export class RecipeList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      recipes: {array:[]}
    };

    this.getRecipes = this.getRecipes.bind(this);
    this.getRecipes();
  }

  getRecipes(){
    var self = this; 
    //get recipies from db
    $.ajax({
      url: '/getRecipes',
      type: 'POST',
      data: this.props.list,
      success: function(data) {
        console.log('post success');
        console.log('dance', data);
        self.setState({recipes: data})
        console.log('LEE', self.state.recipes);
      },
      error: function(error) {
        console.log('error', error);
      }
    })
  }

  render(){
    //render if there is anything to render
    if(this.state.recipes.array[0] !== undefined){
      return(
        <div>
        {
          this.state.recipes.array.map( (item, index) => {
            return(<RecipeCard key={index} recipe={item} />)
          })
        }
        </div>
      );
    } else {
      return (<div>nothing</div>);
    }
    
  }
}