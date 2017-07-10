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

export const loginUser = ({ userName }) => {
  return (dispatch) => {
    const url = 'http://localhost:4000/socket';
    const socket = new Socket(url, {});
    socket.onOpen(event => console.log('Connected.', event));
    socket.onError(event => loginUserFail(dispatch));
    socket.onClose(event => loginUserFail(dispatch));
    socket.connect({});

    dispatch({ type: LOGIN_USER });

    const chan = socket.channel('room:lobby', { userName });

    // join the channel
    chan.join()
      .receive('ignore', () => {
        loginUserFail(dispatch);
      })
      .receive('ok', () => {
        loginUserSuccess(dispatch, userName);
      })
      .receive('timeout', () => {
        loginUserFail(dispatch);
      });

    // channel-level event handlers
    //chan.onError(event => console.log('Channel blew up.'))
    //chan.onClose(event => console.log('Channel closed.'))
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};
