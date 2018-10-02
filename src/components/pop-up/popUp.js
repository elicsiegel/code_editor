import React, { Component } from 'react';
import './popUp.css';

class PopUp extends Component {

  constructor() {
    super();
  }

  render() {
    const matches = this.props.keywords.map((keyword) => {
      if (this.props.currentWord !== "" && keyword.includes(this.props.currentWord) && keyword.length > this.props.currentWord.length) {
        return <li
                  onClick={() => this.props.addSuggestion(keyword)}
                  key={keyword}>{keyword}</li>
      }
    });

    const currentWord = this.props.currentWord;
    const addSuggestion = this.props.addSuggestion;
    const objectMatches = Object.keys(this.props.objects).map((key) => {
      if (currentWord !== "" && currentWord.startsWith(key.slice(0, currentWord.length)) && currentWord.length < key.length) {
        return <li
                  onClick={() => addSuggestion(key)}
                  key={key}>{key}</li>
      }
    });

    let matchingKeys;
    const addObject = this.props.addObject;
    const splitWord = currentWord.split(".")

    if (currentWord[currentWord.length - 1] === ".") {

      const toExecute = "this.props.objects." + currentWord.slice(0, currentWord.length - 1)

      if (typeof eval(toExecute) === "object") {
        matchingKeys = Object.keys(eval(toExecute)).map((key) => {
        const suggestion = "." + key;

        return <li
                  onClick={() => addSuggestion(currentWord + key)}
                      key={key}>{suggestion}</li>
        });
      }
    }

    return (
      <div className="pop-up">
        <h4>Do you mean?</h4>
        <ul>
          {matches}
          {objectMatches}
          {matchingKeys}
        </ul>
      </div>
    );
  }
}

export default PopUp;
