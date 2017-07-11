import React from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import _ from 'lodash';

import ListItem from './ListItem';

class RoomList extends React.Component {
  componentWillMount() {
    // TODO Fetch rooms from the server
    this.createDataSource([{ name: 'lobby' }]);
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

export default connect(null)(RoomList);
