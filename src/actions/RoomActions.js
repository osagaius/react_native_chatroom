import { Actions } from 'react-native-router-flux';

import {
} from './types.js';

export const messageTextChanged = (text) => {
  return {
    type: 'message_text_changed',
    payload: text
  };
};

export const addMessage = (channel, messageText, roomName, userName) => {
  return (dispatch) => {
    dispatch({ type: 'add_message' });

    channel.push('new:msg', { messageText, userName });
  };
};

export const joinRoom = (roomName, socket, userName) => {
  return (dispatch) => {

    const channel = socket.channel(`room:${roomName}`, { userName });

    // join the channel
    channel.join()
      .receive('ignore', () => {
        console.log('ignore');
      })
      .receive('ok', () => {
        dispatch({
          type: 'join_room_success',
          payload: { channel, roomName }
        });
        setUpNewMessagesHandler(dispatch, channel, roomName);
        Actions.roomEdit({ room: { name: roomName } });
      })
      .receive('timeout', () => {
        console.log('timeout when joining room ', roomName);
      });
  };
};

const setUpNewMessagesHandler = (dispatch, channel, roomName) => {
  channel.on('new_messages', payload => {
    const messages = payload.value;
    dispatch({ type: 'new_messages', payload: { roomName, messages } });
  });
};
