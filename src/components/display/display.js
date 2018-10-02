import React, { Component } from 'react';
import './display.css';

class Display extends Component {

  constructor() {
    super();

  }

  componentDidMount() {
    this.highlightKeywords();
  }

  componentDidUpdate() {
    this.highlightKeywords();
  }

  wrappedInQuotes(word) {
    if (word.length === 1) return false;
    return word[0] === "'" && word[word.length - 1] === "'" || word[0] === '"' && word[word.length - 1] === '"';
  }

  isKeyword(word) {
    return this.props.keywords.includes(word) || this.wrappedInQuotes(word);
  }

  highlightKeywords() {
    let text = this.props.text.split(" ")
    let newString = "";

    for (var i = 0; i < text.length; i++) {
      if (this.isKeyword(text[i])) {  
        newString += '<mark>' + text[i] + '</mark> ';
      } else {
        newString += text[i] + " ";
      }
    }

    document.getElementsByClassName("display-div")[0].innerHTML = newString;

    return newString;
  }

  render() {
    return (
      <div className="display-div"></div>
    );
  }
}

export default Display;
