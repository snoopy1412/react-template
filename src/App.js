import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import User from 'view/user';
import logo from 'assets/logo.svg';
import './style/App.scss';

@inject('store') @observer
class App extends Component {
  render() {
    return (
      <div className="App">
      {this.props.store.userName}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <User/>
      </div>
    );
  }
}

export default App;
