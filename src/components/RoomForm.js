import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { roomNameChanged } from '../actions';
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
            onChangeText={text => this.props.roomNameChanged({ text })}
          />
        </CardSection>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { name } = state.roomForm;

  return { name };
};

export default connect(mapStateToProps, { roomNameChanged })(RoomForm);
