import { Actions } from 'react-native-router-flux';

import {
} from './types.js';

export const joinRoom = (roomName, socket, userName) => {
  return (dispatch) => {
    //dispatch({ type: JOIN_ROOM });

    const chan = socket.channel(`room:${roomName}`, { userName });

    // join the channel
    chan.join()
      .receive('ignore', () => {
        console.log('ignore');
      })
      .receive('ok', () => {
        console.log('joined room ', roomName);
        dispatch({ type: 'join_room_success' });
        Actions.roomEdit({ room: { name: roomName } });
      })
      .receive('timeout', () => {
        console.log('timeout when joining room ', roomName);
      });
  };
};
