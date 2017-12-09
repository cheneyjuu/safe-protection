import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect(state => ({
  list: state.user,
}))
export default class UserList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'user/fetch',
      payload: { page: 0, size: 10 },
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h2>User List</h2>
      </div>
    );
  }
}
