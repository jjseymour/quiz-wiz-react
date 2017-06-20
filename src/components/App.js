import React, { Component } from 'react';
import NewRelic from '@wanderio/new-relic-react'
// import logo from '../logo.svg';
import '../App.css';

import Header from './header'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
          <NewRelic licenseKey="d27ae7d6dbaa32016b7e97b964fd5f0accb8e381" applicationID="React (Development)" />
        </div>
          {this.props.children}
          <h1>This is the footer</h1>
      </div>
    );
  }
}

export default App;
