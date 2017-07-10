import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Text } from 'react-native';
import Communications from 'react-native-communications';

import { employeeUpdate, employeeEdit, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import RoomForm from './RoomForm';

class RoomEdit extends Component {
  state = { confirmVisible: false };

  onButtonPress() {
  }

  render() {
    return (
      <Card>
        <Text>
          {this.props.room.name}
        </Text>

      </Card>
    );
  }
}

export default connect(null)(RoomEdit);
