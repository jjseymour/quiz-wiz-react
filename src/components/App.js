import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

import Header from './header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
          {this.props.children}
          <h1>This is the footer</h1>
      </div>
    );
  }
}

export default App;
