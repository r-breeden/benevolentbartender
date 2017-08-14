import React from 'react';
import ReactDOM from 'react-dom';
import { CheckBox } from './CheckBox.jsx';
import { MixItButton } from './MixItButton.jsx';
import { RecipeList } from './RecipeList.jsx';


export class App extends React.Component{
  constructor(props) {
    super(props);
    
  }
  render(){
    return(
      <div>
        <h1>Benevolent Bartender</h1>
        <div>
          <p>Select your ingredients</p>
          <CheckBox />
        </div>
        <MixItButton />
        <RecipeList />
      </div>
    );
  }
}
