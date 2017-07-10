import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import RoomList from './components/RoomList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

const RouterComponent = () => {
  return (
    <Router sceneStyle={{ paddingTop: 65 }}>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Choose Username" />
        </Scene>
        <Scene key="main">
          <Scene
            key="roomList"
            component={RoomList}
            title="Rooms"
            onRight={() => Actions.employeeCreate()}
            rightTitle="Add Room"
          />
          <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
          <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />
        </Scene>
      </Scene>

    </Router>
  );
};

export default RouterComponent;
