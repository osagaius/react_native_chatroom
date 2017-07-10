import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Communications from 'react-native-communications';

import { employeeUpdate, employeeEdit, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import RoomForm from './RoomForm';

class RoomEdit extends Component {
  state = { confirmVisible: false };

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    const uid = this.props.employee.uid;

    this.props.employeeEdit({ name, phone, shift: shift || 'Monday', uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;

    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }

  onFirePress() {
    this.setState({ confirmVisible: !this.state.confirmVisible });
  }

  onDecline() {
    this.setState({ confirmVisible: false });
  }

  onAccept() {
    this.setState({ confirmVisible: false });
    this.props.employeeDelete({ uid: this.props.employee.uid });
  }

  render() {
    return (
      <Card>
        <RoomForm {...this.props.room} />
        
      </Card>
    );
  }
}

export default connect(null)(RoomEdit);
