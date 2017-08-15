import React from 'react';
import ReactDOM from 'react-dom';
import { SelectBox } from './SelectBox.jsx';
import { RecipeList } from './RecipeList.jsx';


export class App extends React.Component{
  constructor(props) {
    super(props);
    
  }
  render(){
    return(
      <div>
        <h1>Benevolent Bartender</h1>
        <SelectBox />
        <RecipeList />
      </div>
    );
  }
}
