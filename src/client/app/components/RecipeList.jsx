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

  //get all recipes from db
  getRecipes(){
    var self = this; 

    $.ajax({
      url: '/getRecipes',
      type: 'POST',
      data: this.props.list,
      success: function(data) {
        console.log('post success');
        self.setState({recipes: data})
      },
      error: function(error) {
        console.log('error', error);
      }
    })
  }

  render(){
    //render if there is anything to render
    if( this.state.recipes.array[0] !== undefined ){
      return(
        <div>
        {
          this.state.recipes.array.map( (item, index) => {
            return(<RecipeCard key={index} recipe={item} />)
          })
        }
        </div>
      );
    //if no input this should not be called
    } else {
      return (<div>nothing</div>);
    }
    
  }
}