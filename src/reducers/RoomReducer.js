import {
  NEW_MESSAGES_RECEIVED,
  ADD_MESSAGE,
  ADD_MESSAGE_SUCCESS,
  ADD_MESSAGE_FAILURE,
  JOIN_ROOM_SUCCESS,
  MESSAGE_TEXT_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  messages: {},
  channels: {},
  error: '',
  messageText: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_TEXT_CHANGED:
      return {
        ...state,
        messageText: action.payload,
      };
    case NEW_MESSAGES_RECEIVED:
      return { ...state,
        messages: {
          ...state.messages,
          [action.payload.roomName]: action.payload.messages
        }
      };
    case ADD_MESSAGE:
      return {
        ...state,
        error: '',
        messageText: ''
      };
    case ADD_MESSAGE_SUCCESS:
      return {
        ...state,
        messageText: ''
      };
    case ADD_MESSAGE_FAILURE:
      return {
        ...state,
        error: 'Failed to send message'
      };
    case JOIN_ROOM_SUCCESS:
      return { ...state,
        channels: {
          ...state.channels,
          [action.payload.roomName]: action.payload.channel
        }
      };
    default:
      return state;
  }
};
