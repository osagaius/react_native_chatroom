import { Actions } from 'react-native-router-flux';

import {
  NEW_MESSAGES_RECEIVED,
  ADD_MESSAGE,
  JOIN_ROOM_SUCCESS,
  MESSAGE_TEXT_CHANGED,
  ROOM_FORM_NAME_CHANGED,
  ROOM_CREATE_SUCCESS
} from './types.js';

export const roomNameChanged = ({ text }) => {
  return {
    type: ROOM_FORM_NAME_CHANGED,
    payload: text
  };
};

export const roomCreate = ({ socket, name, userName }) => {
  return (dispatch) => {
    createAndJoinRoom({ dispatch, socket, name, userName, redirect: true });
  };
};

export const messageTextChanged = (text) => {
  return {
    type: MESSAGE_TEXT_CHANGED,
    payload: text
  };
};

export const addMessage = (channel, messageText, roomName, userName) => {
  return (dispatch) => {
    dispatch({ type: ADD_MESSAGE });

    channel.push('new:msg', { messageText, userName });
  };
};

export const joinRoom = (roomName, socket, userName, redirect) => {
  const name = roomName;

  return (dispatch) => {
    createAndJoinRoom({ dispatch, socket, name, userName, redirect });
  };
};

const setUpNewMessagesHandler = (dispatch, channel, roomName) => {
  channel.on('new_messages', payload => {
    const messages = payload.value;
    dispatch({ type: NEW_MESSAGES_RECEIVED, payload: { roomName, messages } });
  });
};

const createAndJoinRoom = ({ dispatch, socket, name, userName, redirect }) => {
  const channel = socket.channel(`room:${name}`, { userName });

  // join the channel
  channel.join()
    .receive('ignore', () => {
      //TODO Dispatch error
      console.log('ignore');
    })
    .receive('ok', () => {
      dispatch({
        type: JOIN_ROOM_SUCCESS,
        payload: { channel, name }
      });
      setUpNewMessagesHandler(dispatch, channel, name);

      if (redirect === true) {
        Actions.roomEdit({ room: { name } });
      }
    })
    .receive('timeout', () => {
      //TODO Dispatch error
      console.log('timeout when joining room ', name);
    });
};
