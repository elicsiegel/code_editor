import React, { Component } from 'react';
import Display from './components/display/display';
import './App.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      text: ""
    }
    
    this.updateText = this.updateText.bind(this);
  }
  
  updateText(e) {
    let textareaText = e.target.value;
    
    this.setState({text: textareaText})
  }
  
  render() {
    return (
      <div className="App">
        <textarea onChange={this.updateText} />
        <Display text={this.state.text}/>
      </div>
    );
  }
}

export default App;
