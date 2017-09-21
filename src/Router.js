import React from 'react';
import { Scene, Router, Actions, Drawer, Stack } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RoomList from './components/RoomList';
import RoomCreate from './components/RoomCreate';
import RoomEdit from './components/RoomEdit';
import DrawerContent from './components/DrawerContent';
import MenuIcon from './images/menu_burger.png';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 1 }}>
      <Stack key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Choose Username" />
        </Scene>
        <Drawer
          hideNavBar
          key="drawer"
          contentComponent={DrawerContent}
          drawerImage={MenuIcon}
        >
        <Stack key="main">
          <Scene
            key="roomList"
            component={RoomList}
            title="Rooms"
            onRight={() => Actions.roomCreate()}
            rightTitle="Add Room"
          />
          <Scene key="roomEdit" component={RoomEdit} title="Room" />
          <Scene key="roomCreate" component={RoomCreate} title="Create Room" />
        </Stack>
      </Drawer>
    </Stack>
    </Router>
  );
};

export default RouterComponent;
