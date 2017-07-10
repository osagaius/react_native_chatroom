import { USERNAME_CHANGED,
  LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from '../actions/types.js';

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
    case 'connect_success':
      return {
        ...state,
        socket: action.payload.socket
      };
    case 'connect_fail':
      return { ...state,
        loading: false,
        error: 'Connection Failed.',
        socket: null
      };
    default:
      return state;
  }
};
