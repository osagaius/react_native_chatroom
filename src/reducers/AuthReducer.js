import { USERNAME_CHANGED, PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from '../actions/types.js';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state,
        user: action.payload,
        ...INITIAL_STATE
      };
    case LOGIN_USER_FAIL:
      console.log('auth failed', action.payload);
      return { ...state,
        loading: false,
        error: 'Connection Failed.',
        password: ''
      };
    default:
      return state;
  }
};
