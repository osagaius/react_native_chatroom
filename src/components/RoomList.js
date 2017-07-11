import React from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import _ from 'lodash';

import ListItem from './ListItem';
import { joinRoom } from '../actions';

class RoomList extends React.Component {
  componentWillMount() {
    const redirectToRoom = false;
    this.props.joinRoom(
      'lobby',
      this.props.socket,
      this.props.userName,
      redirectToRoom
    );

    // TODO Fetch rooms from the server
    const rooms = [];
    this.createDataSource(rooms);
  }

  createDataSource(rooms) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(rooms);
  }

  renderRow(room) {
    return <ListItem room={room} />;
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
  const { socket, userName } = state.auth;

  return { socket, userName };
};

export default connect(mapStateToProps, { joinRoom })(RoomList);
