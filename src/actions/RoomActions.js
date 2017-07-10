import { Actions } from 'react-native-router-flux';

import {
} from './types.js';

export const joinRoom = (name, socket, userName) => {
  socket.connect({});
  const chan = socket.channel(`room:${name}`, { userName });

  // join the channel
  chan.join()
    .receive('ignore', () => {
      console.log('ignore');
      Actions.roomEdit();
    })
    .receive('ok', () => {
      console.log('joined room ', name);
    })
    .receive('timeout', () => {
      console.log('time when join room ', name);
    });
};
