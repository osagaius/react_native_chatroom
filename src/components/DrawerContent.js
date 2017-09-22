import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import RoomList from './RoomList';
import UserList from './UserList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 50
  },
  text: {
    fontSize: 18,
    paddingLeft: 15
  },
  title: {
    fontSize: 30,
    paddingLeft: 15
  }
});

class DrawerContent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Online</Text>
        <UserList />

        <Text style={styles.title}>Rooms</Text>
        <RoomList />
      </View >
    );
  }
}

export default DrawerContent;
