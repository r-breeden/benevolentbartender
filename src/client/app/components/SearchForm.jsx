import React from 'react';

export class SearchForm extends React.Component{
  render(){
    return(
      <form id="search">
        <input type='text' placeholder='enter your ingredients'
         value={this.props.tex} onChange={this.props.updateText}></input>
        <button className="button" onClick={this.props.onSubmit}>Submit</button>
        <div id="tinyMsg">SEPERATE INGREDIENTS WITH COMMAS</div>
      </form>
    );
  }
}