import {
  USERNAME_CHANGED,
  LOGIN_USER,
  CONNECT_FAIL,
  CONNECT_SUCCESS
 } from '../actions/types.js';

const INITIAL_STATE = {
  userName: '',
  error: '',
  loading: false,
  socket: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      return { ...state, userName: action.payload, error: '', loading: false };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case CONNECT_SUCCESS:
      return {
        ...state,
        socket: action.payload.socket
      };
    case CONNECT_FAIL:
      return { ...state,
        loading: false,
        error: 'Connection Failed.',
        socket: null
      };
    default:
      return state;
  }
};
