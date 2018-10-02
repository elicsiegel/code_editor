import React, { Component } from 'react';
import './popUp.css';

function getValue(s, o) {
    var keys = s.split(".")

    for (let i = 0, length = keys.length; i < length; i++) {
        let key = keys[i];

        if (!(key in o) || o[key] === null || o[key] === undefined) {
            throw new Error("Could not get value of " + s);
        }

        o = o[key];
    }

    return o;
}

class PopUp extends Component {

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
    const splitWord = currentWord.split(".");

    if (currentWord.includes(".")) {
      let potentialObject = "this.props.objects.";
      let currentTerm = splitWord[splitWord.length - 1];
      let joinedWord;
      joinedWord = splitWord.slice(0, splitWord.length - 1).join(".");
      potentialObject += joinedWord;

      try {
        potentialObject = getValue(joinedWord, this.props.objects)
        if (typeof potentialObject === "object") {

         matchingKeys = Object.keys(potentialObject).map((key) => {
           const suggestion = "." + key;
           if (currentTerm.length > 0) {
             if (key.startsWith(currentTerm) && currentTerm.length < key.length) {
               return <li onClick={() => addSuggestion(joinedWord + suggestion)}
                 key={key}>{suggestion}</li>
             }
           } else {
             return <li onClick={() => addSuggestion(joinedWord + suggestion)}
               key={key}>{suggestion}</li>
           }
         });
       }
     } catch(err) {
        console.log("Invalid object name")
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
