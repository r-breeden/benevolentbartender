import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export class SelectBox extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      text: '',
      vetIngredients: []
    };

    this.updateText = this.updateText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e){
    e.preventDefault();
    var vettedIngredients = [];
    //remove white spaces 
    var refactorText = this.state.text;
    refactorText = refactorText.replace(/\s/g,'');
    var self = this;

    //check if ingredients exist in db
    $.ajax({
      url:'/ingredients',
      type: 'GET',
      success: function(data){
        //see which ingredients exist in db
        refactorText = refactorText.split(',');
        refactorText.forEach( function (item) {
          data.ingredients.forEach( function (ingredient) {
            item = item.toLowerCase();
            if (item === ingredient){
              vettedIngredients.push(item);
            }
          })
        })
        //pass vetted ingredients list to app component (this.state.ingredients in app component)
        self.props.handler(vettedIngredients);

        self.setState({vetIngredients: vettedIngredients});
      },
      error: function(data){
        console.log('get request FAILED', error);
      }
    })

    //request recipes from list of ingredients that do exist
    // $.ajax({
    //   url: '/recipes',
    //   type: 'POST',
    //   data: this.state.vetIngredients,
    //   success: function(data){
    //     console.log('post request SUCCESS');
    //   },
    //   error: function(error){
    //     console.log('post request FAILED', error);
    //   }
    // })
  }

  //grab value from text box and set state on change
  updateText(e){
    this.setState({text: e.target.value});
  }

  render(){
    if (this.state.vetIngredients[0] !== undefined){
      //render vetted ingredients list
      return(
        <div>
          Seperate ingredients by commas
          <form>
            <input type='text' placeholder='enter your ingredients' value={this.state.text} onChange={this.updateText}></input>
            <input type='submit' value='Submit' onClick={this.onSubmit}></input>
          </form>
          <p> Selected Ingredients <br/>
          (ingredients not available are not displayed)
          </p>
          <ul>
          {this.state.vetIngredients.map( (item, index) => {
            return(<li key={index} >{item}</li>)
          })}
          </ul>
        </div>
      );
    //render if no ingredients listed yet
    } else {
      return(
        <div>
          Seperate ingredients by commas
          <form>
            <input type='text' placeholder='enter your ingredients' value={this.state.text} onChange={this.updateText}></input>
            <input type='submit' value='Submit' onClick={this.onSubmit}></input>
          </form>
        </div>
      );
    }
  }
}