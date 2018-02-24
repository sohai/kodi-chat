/* global describe it expect */

import io from 'socket.io-client';
import config from './config';
require('./index');

const socketURL = `http://${config.host}:${config.port}`;

const options = {
  transports: ['websocket'],
  'force new connection': true
};

describe('Chat server', () => {
  it('client should be able to connet', done => {
    const client = io.connect(socketURL, options);

    client.on('connect', function() {
      client.disconnect();
      done();
    });
  });
});
