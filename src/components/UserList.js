import React from 'react';
import { connect } from 'react-redux';
import { ListView, Text } from 'react-native';
import _ from 'lodash';

import UserListItem from './UserListItem';

class RoomList extends React.Component {
  componentWillMount() {
    this.createDataSource(this.props.users);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.users);
  }

  createDataSource(users) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(users);
  }

  renderRow(user) {
    return <UserListItem user={user} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

const mapStateToProps = (state) => {
  let { users } = state.room;
  const { userName } = state.auth;

  users = users.filter((el) => {
    return el !== userName;
  });

  return { users };
};

export default connect(mapStateToProps)(RoomList);
