import React, { Component } from 'react';
import Display from './components/display/display';
import PopUp from './components/pop-up/popUp';

import './App.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      text: "",
      currentWord: ""
    }
    
    this.keywords = ["var", "function", "class"];
    this.updateText = this.updateText.bind(this);
    this.addSuggestion = this.addSuggestion.bind(this);
  }
  
  addSuggestion(suggestion) {
    const firstPart = this.state.text.slice(0, this.state.currentWordIdxs[0]);
    const secondPart = this.state.text.slice(this.state.currentWordIdxs[1], -1);
    
    const finalText = firstPart + suggestion + secondPart
    
    document.getElementsByTagName("textarea")[0].value = finalText;
    
    this.setState({
      text: finalText
    })
  }
  
  updateText(e) {
    let textareaText = e.target.value;
    let currentWord = ""
    let idx = e.target.selectionStart - 1
    
    while (textareaText[idx] && textareaText[idx] !== " ") {
      currentWord = textareaText[idx] + currentWord
      idx --
    }
    
    this.setState({
      text: textareaText, 
      currentWord: currentWord,
      currentWordIdxs: [idx + 1, e.target.selectionStart]})
  }
  
  render() {
    console.log(this.state)
    return (
      <div className="App">
        <div className="editor-wrapper">
          <textarea onChange={this.updateText} />
          <Display 
            text={this.state.text}
            keywords={this.keywords} />
        </div>
        <PopUp
          addSuggestion={this.addSuggestion}
          currentWord={this.state.currentWord}
          keywords={this.keywords} />
      </div>
    );
  }
}

export default App;
