import React from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import _ from 'lodash';

import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class RoomList extends React.Component {
  componentWillMount() {
    // this.props.employeesFetch();
    //this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    //this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem />;
  }

  render() {
    return (
      <View></View>
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
