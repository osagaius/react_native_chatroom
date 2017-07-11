import {
  ROOM_FORM_NAME_CHANGED,
  ROOM_CREATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  name: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ROOM_FORM_NAME_CHANGED:
      return { ...state, name: action.payload };
    case ROOM_CREATE_SUCCESS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
