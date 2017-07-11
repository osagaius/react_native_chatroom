import {
} from '../actions/types';

const INITIAL_STATE = {
  messages: {},
  channels: {},
  error: '',
  messageText: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'message_text_changed':
      return {
        ...state,
        messageText: action.payload,
      };
    case 'new_messages':
      return { ...state,
        messages: {
          ...state.messages,
          [action.payload.roomName]: action.payload.messages
        }
      };
    case 'add_message':
      return {
        ...state,
        error: '',
        messageText: ''
      };
    case 'add_message_success':
      return {
        ...state,
        messageText: ''
      };
    case 'add_message_failure':
      return {
        ...state,
        error: 'Failed to send message'
      };
    case 'join_room_success':
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
