import { Actions } from 'react-native-router-flux';

import {
  NEW_MESSAGES_RECEIVED,
  ADD_MESSAGE,
  JOIN_ROOM_SUCCESS,
} from './types.js';

export const messageTextChanged = (text) => {
  return {
    type: 'message_text_changed',
    payload: text
  };
};

export const addMessage = (channel, messageText, roomName, userName) => {
  return (dispatch) => {
    dispatch({ type: ADD_MESSAGE });

    channel.push('new:msg', { messageText, userName });
  };
};

export const joinRoom = (roomName, socket, userName) => {
  return (dispatch) => {

    const channel = socket.channel(`room:${roomName}`, { userName });

    // join the channel
    channel.join()
      .receive('ignore', () => {
        //TODO Dispatch error
        console.log('ignore');
      })
      .receive('ok', () => {
        dispatch({
          type: JOIN_ROOM_SUCCESS,
          payload: { channel, roomName }
        });
        setUpNewMessagesHandler(dispatch, channel, roomName);
        Actions.roomEdit({ room: { name: roomName } });
      })
      .receive('timeout', () => {
        //TODO Dispatch error
        console.log('timeout when joining room ', roomName);
      });
  };
};

const setUpNewMessagesHandler = (dispatch, channel, roomName) => {
  channel.on('new_messages', payload => {
    const messages = payload.value;
    dispatch({ type: NEW_MESSAGES_RECEIVED, payload: { roomName, messages } });
  });
};
