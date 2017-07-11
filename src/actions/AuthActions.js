import { Actions } from 'react-native-router-flux';
import { Socket } from 'phoenix';

import {
  USERNAME_CHANGED,
  CONNECT_FAIL,
  CONNECT_SUCCESS,
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
    const socket = new Socket(url);

    socket.connect();

    socket.onOpen(() => {
      dispatch({ type: CONNECT_SUCCESS, payload: { socket } });
      Actions.main();
    });

    socket.onError(() => {
      loginUserFail(dispatch);
    });

    socket.onClose(() => {
      loginUserFail(dispatch);
    });
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: CONNECT_FAIL });
};
