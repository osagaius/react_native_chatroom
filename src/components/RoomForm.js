import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import { joinRoom } from '../actions';
import { CardSection, Input } from './common';

class RoomForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="German Sherpards Over Everything"
            value={this.props.name}
            onChangeText={name => this.props.roomNameChanged({ name })}
          />
        </CardSection>
      </View>
    );
  }
}

export default connect(null, { joinRoom })(RoomForm);
