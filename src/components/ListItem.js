import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { connect } from 'react-redux';

import { CardSection } from './common/CardSection';
import { joinRoom } from '../actions';

class ListItem extends React.Component {
  onRowPress() {
    this.props.joinRoom(this.props.room.name, this.props.socket, this.props.userName);
  }

  render() {
    const { name } = this.props.room;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = (state) => {
  const { socket, userName } = state.auth;

  return { socket, userName };
};

export default connect(mapStateToProps, { joinRoom })(ListItem);
