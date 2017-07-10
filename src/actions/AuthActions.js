import { Actions } from 'react-native-router-flux';
import { Socket } from 'phoenix';

import {
  USERNAME_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
} from './types.js';

export const userNameChanged = (text) => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
};

// TODO Rename since we aren't doing login stuff here
export const joinSocket = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    const url = 'http://localhost:4000/socket';
    const socket = new Socket(url, {});
    socket.onOpen(event => {
      dispatch({ type: 'connect_success', payload: { socket } });
      Actions.main();
    });
    socket.onError(event => loginUserFail(dispatch));
    socket.onClose(event => loginUserFail(dispatch));
    socket.connect({});
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: 'connect_fail' });
};
