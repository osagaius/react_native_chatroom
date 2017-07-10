import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Text, ScrollView } from 'react-native';
import Communications from 'react-native-communications';

import { employeeUpdate, employeeEdit, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm, Input } from './common';
import RoomForm from './RoomForm';

class RoomEdit extends Component {
  // TODO Fetch messages when we open room

  onButtonPress() {
  }

  renderMessages() {
    let roomMessages = [];

    if (this.props.messages[this.props.room.name] !== undefined) {
      roomMessages = this.props.messages[this.props.room.name];
    }

    return roomMessages.map(message =>
      <Text key={message}>
        {message}
      </Text>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <ScrollView>
            {this.renderMessages()}
          </ScrollView>
        </CardSection>

        <CardSection>
          <Input
            label="New Message"
            placeholder="A messsage"
          />
        </CardSection>

        <CardSection>
          <Button>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { messages } = state.room;

  return { messages };
};

export default connect(mapStateToProps)(RoomEdit);
