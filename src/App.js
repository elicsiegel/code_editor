import React, { Component } from 'react';
import Display from './components/display/display';
import PopUp from './components/pop-up/popUp';

import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      text: "",
      currentWord: "",
      objects: {
        obj: {
          foo1: 'some value',
          foo2: {
            foo3: 'some value'
          }
        }
      }
    }

    this.keywords = ["var", "function", "class"];
    this.updateText = this.updateText.bind(this);
    this.addSuggestion = this.addSuggestion.bind(this);
  }

  addSuggestion(suggestion) {
    const firstPart = this.state.text.slice(0, this.state.currentWordIdxs[0]);
    const secondPart = this.state.text.slice(this.state.currentWordIdxs[1], -1);
    const finalText = firstPart + suggestion + secondPart;

    document.getElementsByTagName("textarea")[0].value = finalText;

    this.setState({
      text: finalText,
      currentWord: suggestion
    })
  }

  updateText(e) {
    let textareaText = e.target.value;
    let currentWord = "";
    let idx = e.target.selectionStart - 1;

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
    return (
      <div className="App">
        <h1>Welcome to Eli's Code Editor</h1>
        <div className="editor-wrapper">
          <textarea
            placeholder="Type code here..."
            onChange={this.updateText} />
          <Display
            text={this.state.text}
            keywords={this.keywords} />
        </div>
        <PopUp
          objects={this.state.objects}
          addSuggestion={this.addSuggestion}
          currentWord={this.state.currentWord}
          keywords={this.keywords} />
      </div>
    );
  }
}

export default App;
