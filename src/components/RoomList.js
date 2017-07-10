import React from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import _ from 'lodash';

import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class RoomList extends React.Component {
  componentWillMount() {
    //this.props.roomsFetch();
    this.createDataSource([{ name: 'lobby' }]);
  }

  componentWillReceiveProps(nextProps) {
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

const mapStateToProps = (state) => {
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid };
  });

  return { employees };
};

export default connect(null, { employeesFetch })(RoomList);
