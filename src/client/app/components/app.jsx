import React from 'react';
import ReactDOM from 'react-dom';
import { SelectBox } from './SelectBox.jsx';
import { RecipeList } from './RecipeList.jsx';


export class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      ingredients: []
    };

    this.handler = this.handler.bind(this);
  }

  //hand this to child
  //child able to set state
  handler(vetted){
    this.setState({
      ingredients: vetted
    })
  }

  render(){
    if ( this.state.ingredients[0] !== undefined){
      return(
      <div>
        <img className="imgCenter" src='../img/title.png' />
        <SelectBox handler={this.handler}/>
        <p className="header">RECIPES</p>
        <RecipeList list={this.state.ingredients}/>
      </div>
      );
    } else {
      return(
      <div>
         <img className="imgCenter" src='../img/title.png' />
        <SelectBox handler={this.handler}/>
      </div>
      );
    }
  }
}
