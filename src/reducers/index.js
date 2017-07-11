import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import RoomFormReducer from './RoomFormReducer';
import RoomReducer from './RoomReducer';

export default combineReducers({
  room: RoomReducer,
  auth: AuthReducer,
  roomForm: RoomFormReducer
});
