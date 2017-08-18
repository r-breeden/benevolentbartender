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
        <h1>Benevolent Bartender</h1>
        <SelectBox handler={this.handler}/>
        <h3>Recipe List</h3>
        <RecipeList list={this.state.ingredients}/>
      </div>
      );
    } else {
      return(
      <div>
        <h1>Benevolent Bartender</h1>
        <SelectBox handler={this.handler}/>
      </div>
      );
    }
  }
}
