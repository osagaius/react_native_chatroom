import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Text, View, ScrollView } from 'react-native';
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
      <CardSection key={message}>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>{message}</Text>
          <Text>{message}</Text>
        </View>
      </CardSection>
    );
  }

  render() {
    return (
      <Card>
        <CardSection style={{ marginBottom: 20 }}>
          <ScrollView>
            {this.renderMessages()}
          </ScrollView>
        </CardSection>

        <CardSection>
          <Input
            label="Message:"
            placeholder="I love cats..."
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

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    fontSize: 18
  },
  headerTextStyle: {
    fontSize: 18
  }
};

const mapStateToProps = (state) => {
  const { messages } = state.room;

  return { messages };
};

export default connect(mapStateToProps)(RoomEdit);
