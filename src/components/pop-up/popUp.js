import React, { Component } from 'react';
import './popUp.css';

class PopUp extends Component {
  
  constructor() {
    super();
  }
  
  
  render() {
    const matches = this.props.keywords.map((keyword) => {
      if (this.props.currentWord !== "" && keyword.includes(this.props.currentWord)) {
        return <li 
                  onClick={() => this.props.addSuggestion(keyword)}
                  key={keyword}>{keyword}</li>
      }
    });
    
    return (
      <div className="pop-up">
        <h4>Do you mean?</h4>
        <ul>
          {matches}
        </ul>
      </div>
    );
  }
}

export default PopUp;
