import { Actions } from 'react-native-router-flux';
import { Presence } from 'phoenix';

import {
  NEW_MESSAGES_RECEIVED,
  ADD_MESSAGE,
  JOIN_ROOM_SUCCESS,
  MESSAGE_TEXT_CHANGED,
  ROOM_FORM_NAME_CHANGED,
  ROOM_CREATE_SUCCESS,
  NEW_ROOMS_LIST_RECEIVED
} from './types.js';

export const roomNameChanged = ({ text }) => {
  return {
    type: ROOM_FORM_NAME_CHANGED,
    payload: text
  };
};

const syncPresentUsers = (dispatch, presences) => {
  const presentUsers = [];
  Presence.list(presences, (id, { metas: [first] }) => first.user)
          .map(user => presentUsers.push(user));
  console.log(presentUsers);
  dispatch({ type: 'PRESENCE_CHANGED', payload: presentUsers });
};

export const roomCreate = ({ socket, name, userName }) => {
  return (dispatch) => {
    const successAction = {
      type: ROOM_CREATE_SUCCESS
    };
    createAndJoinRoom({ dispatch, socket, name, userName, redirect: false, successAction });
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

const setUpRoomsListHandler = (dispatch, channel) => {
  channel.on('rooms_list', payload => {
    const rooms = payload.value;
    dispatch({ type: NEW_ROOMS_LIST_RECEIVED, payload: rooms });
  });
};

const setupPresenceListeners = (dispatch, channel) => {
  let presences = {};

  channel.on('presence_state', (state) => {
    presences = Presence.syncState(presences, state);
    syncPresentUsers(dispatch, presences);
  });

  channel.on('presence_diff', (diff) => {
    presences = Presence.syncDiff(presences, diff);
    syncPresentUsers(dispatch, presences);
  });
};

const createAndJoinRoom = ({ dispatch, socket, name, userName, redirect, successAction }) => {
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

      if (successAction !== undefined && successAction) {
        dispatch(successAction);
      }

      setUpNewMessagesHandler(dispatch, channel, name);
      setUpRoomsListHandler(dispatch, channel);

      if (name === 'lobby') {
        setupPresenceListeners(dispatch, channel);
      }

      if (Actions.currentScene !== 'roomList') {
        Actions.roomList();
      }
    })
    .receive('timeout', () => {
      //TODO Dispatch error
      console.log('timeout when joining room ', name);
    });
};
