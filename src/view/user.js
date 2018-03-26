import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('store') @observer
class User extends React.Component {
  render() {
    return (
      <div>{this.props.store.userName}</div>
    )
  }
}

export default User;