import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Text, TouchableWithoutFeedback, View } from 'react-native';

import { CardSection } from './common/CardSection';

class ListItem extends React.Component {
  onRowPress() {
    Actions.roomEdit({ room: this.props.room });
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

export default ListItem;
