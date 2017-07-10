import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Text, View, ScrollView } from 'react-native';

import { addMessage, messageTextChanged } from '../actions';
import { Card, CardSection, Button, Input } from './common';

class RoomEdit extends Component {
  onButtonPress() {
    const roomName = this.props.room.name;

    this.props.addMessage(
      this.props.channels[roomName],
      this.props.messageText,
      roomName,
      this.props.userName
    );
  }

  renderMessages() {
    let roomMessages = [];

    if (this.props.messages[this.props.room.name] !== undefined) {
      roomMessages = this.props.messages[this.props.room.name];
    }

    return roomMessages.map(message =>
      <CardSection key={message.id}>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>{message.messageText}</Text>
          <Text>{message.userName}</Text>
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
            value={this.props.messageText}
            onChangeText={text => this.props.messageTextChanged(text)}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
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
  const { messages, messageText, channels } = state.room;
  const { userName } = state.auth;

  return { messages, userName, messageText, channels };
};

export default connect(mapStateToProps, { messageTextChanged, addMessage })(RoomEdit);
