import React from 'react';
import ReactDOM from 'react-dom';

export class SelectBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      
    };
  }
  render(){
    return(
      <form>
        <input type='text' placeholder='enter your ingredients'></input>
        <input type='submit' value='Submit'></input>
      </form>
    );
  }
}