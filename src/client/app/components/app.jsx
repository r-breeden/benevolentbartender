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

  handler(vetted){
    this.setState({
      ingredients: vetted
    })
  }

  render(){
    return(
      <div>
        <h1>Benevolent Bartender</h1>
        <SelectBox handler={this.handler}/>
        <RecipeList list={this.state.ingredients}/>
      </div>
    );
  }
}
