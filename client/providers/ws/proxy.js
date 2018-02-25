import io from 'socket.io-client';
import statefulProxy from '../../utils/statefulProxy';

const socketFactory = async url => {
  return new Promise((resolve, reject) => {
    const socket = io.connect(url);
    socket.on('connect', () => resolve(socket));
    socket.on('connect_error', reject);
    socket.on('connect_timeout', reject);
  });
};

const proxy = statefulProxy(socketFactory);

proxy.onStart(async (socket, opts = {}) => {
  console.log('connection ready', opts);
});
proxy.onStop(socket => {
  socket.disconnect();
});

const subscribe = (socket, event, onMessage) => socket.on(event, onMessage);

export default {
  subscribe,
  ...proxy
};
