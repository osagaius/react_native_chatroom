import {
} from '../actions/types';

const INITIAL_STATE = {
  messages: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'new_messages':
      return { ...state,
        messages: {
          ...state.messages,
          [action.payload.roomName]: action.payload.messages
        }
      };
    case 'join_room':
    default:
      return state;
  }
};
