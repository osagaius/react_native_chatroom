import {
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'join_room':
      return state;
    default:
      return state;
  }
};
