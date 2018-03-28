import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import User from '@view/user';
import logo from '@assets/logo.svg';
import style from '@style/App.scss';

// console.log(style)
@inject('store') @observer
class App extends Component {
  render() {
    return (
      <div className={style.App}>
      {this.props.store.userName}
        <header className={style['App-header']}>
          <img src={logo} className={style['App-logo']} alt="logo" />
          <h1 className={style['App-title']}>Welcome to React</h1>
        </header>
        <p className={style['App-intro']}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <User/>
      </div>
    );
  }
}

export default App;
