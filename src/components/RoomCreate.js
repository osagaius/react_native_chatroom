import React, { Component } from 'react';
import { connect } from 'react-redux';
import { roomCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import RoomForm from './RoomForm';

class RoomCreate extends Component {
  onButtonPress() {
  }

  render() {
    return (
      <Card>
        <RoomForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name } = state.roomForm;

  return { name };
};

export default connect(mapStateToProps, {
  roomCreate
})(RoomCreate);
