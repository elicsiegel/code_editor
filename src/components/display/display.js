import React, { Component } from 'react';
import './display.css';

class Display extends Component {
  
  constructor() {
    super();
    this.state = {
      
    }
    
  }
  

  render() {
    return (
      <div className="display-div">
        {this.props.text}
      </div>
    );
  }
}

export default Display;
