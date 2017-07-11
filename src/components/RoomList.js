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

    this.createDataSource(this.props.rooms);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.rooms);
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
  console.log('ROOMS LIST GOT NEW STATE ', state);
  const { socket, userName } = state.auth;
  const { rooms } = state.room;

  return { socket, userName, rooms };
};

export default connect(mapStateToProps, { joinRoom })(RoomList);
