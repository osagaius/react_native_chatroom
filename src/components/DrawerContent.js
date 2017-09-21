import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import RoomList from './RoomList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2
  },
});

class DrawerContent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Drawer Content</Text>
        <Text>Title: {this.props.title}</Text>
        <RoomList />
      </View >
    );
  }
}

export default DrawerContent;
