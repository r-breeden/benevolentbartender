import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { SearchForm } from './SearchForm.jsx';

/**
*SelectBox
*Until input is entered this will render SearchForm.
*If user inputs ingredients that are not found in the db this will render error msg.
*If user inputs ingredients that exist in db this will generate a list of recipies via 
*the SearchForm component. 
*/

export class SelectBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      vetIngredients: [],
      ingredNotFound: false
    };

    this.updateText = this.updateText.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
  * takes user input (ingredients) and compares them against the ingredients in db
  * matching ingredients are added to the app components state via the handler prop
  * vetted ingredients are also added to SelectBox's state as vetIngredients. 
  */
  onSubmit(e){
    e.preventDefault();
    var vettedIngredients = [];
    //remove white spaces 
    var refactorText = this.state.text;
    refactorText = refactorText.replace(/\s/g,'');
    var self = this;

    //check if ingredients exist in db
    $.ajax({
      url: '/ingredients',
      type: 'GET',
      success: function(data) {
        //data is ingredients list from db
        //see which ingredients exist in db
        refactorText = refactorText.split(',');
        //item is user input
        //ingredient is list of ingredeients from db
        refactorText.forEach( function (item) {
          data.forEach( function (ingredient) {
            item = item.toLowerCase();
            if (item === ingredient.name.toLowerCase().replace(/\s/g,'')) {
              //check if ingredient is a duplicate
              if ( !vettedIngredients.includes(item)) {
                //if not already in vettedIngredients list 
                //put vetted ingredients into array
                vettedIngredients.push(item);
              }
              //remove error msg
              self.setState({ingredNotFound: false});
            }
          });
        });

        //pass vetted ingredients list to app component (this.state.ingredients in app component)
        self.props.handler(vettedIngredients);
        //if there are no ingredients that the user input
        //that match those in the db set ingredNotFound to true
        //this will result in rendering error msg
        if ( vettedIngredients.length === 0 ) {
          self.setState({ingredNotFound: true});
        }

        self.setState({vetIngredients: vettedIngredients});

      },
      error: function(error) {
        console.log('get request FAILED', error);
      }
    });
  }

  /**
  * updateText: grab value from text box and set state
  */
  updateText(e) {
    this.setState({text: e.target.value});
  }

  render() {

    var subtitle = 'FIND WHAT DRINKS YOU CAN MAKE WITH WHAT YOU ALREADY HAVE';
    var noIngredFoundMsg = 'Gasp! No ingredients found. Maybe check spelling?'

    //No ingredients found error message 
    //(User inputs ingredients that are not found in the db)
    if (this.state.ingredNotFound === true) {
       return(
        <div className="center">
          <span className="header">{subtitle}</span>
          <div id='min'>
            <SearchForm tex={this.state.text} updateText={this.updateText} onSubmit={this.onSubmit}/>
          </div>
          <span className="error">{noIngredFoundMsg}</span>
        </div>
      );
    } else if (this.state.vetIngredients[0] !== undefined) {
      //render vetted ingredients list
      //(user ingredients input are found in the db)
      return (
        <div>
          <div className="center">
            <span className="header">{subtitle}</span>
            <div id='min'>
              <SearchForm tex={this.state.text} updateText={this.updateText} onSubmit={this.onSubmit}/>
            </div>
          </div>
          <div>
            <span className="header">SELECTED INGREDIENTS</span>
            <span className="error">INGREDIENTS NOT AVAILABLE ARE NOT DISPLAYED</span>
            <ul>
            {this.state.vetIngredients.map( (item, index) => {
              return (<li key={index}>{item}</li>);
            })}
            </ul>
          </div>
        </div>
      );
    //render if no ingredients listed yet
    } else {
      return (
        <div className="center">
          <span className="center header">{subtitle}</span>
          <div id='min'>
            <SearchForm tex={this.state.text} updateText={this.updateText} onSubmit={this.onSubmit}/>
          </div>
        </div>
      );
    }
  }
}