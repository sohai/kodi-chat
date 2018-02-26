/* global describe it expect */

import io from 'socket.io-client';
import config from '../config';
require('./index');

const socketURL = `http://${config.host}:${config.port}`;

const options = {
  transports: ['websocket'],
  'force new connection': true
};

xdescribe('Chat server', () => {
  it('client should be able to connet', done => {
    const client = io.connect(socketURL, options);

    client.on('connect', () => {
      client.on('init', res => {
        expect(res).toBe('User1');
        client.disconnect();
        done();
      });
    });
  });
  it('should exceeded max user limit', done => {
    const client1 = io.connect(socketURL, options);
    const client2 = io.connect(socketURL, options);
    const client3 = io.connect(socketURL, options);
    expect.assertions(1);
    client3.on('maximum user number exceeded', res => {
      expect(res).toBe(config.userLimit);
      client1.disconnect();
      client2.disconnect();
      done();
    });
  });
  it('client1 should recive user joined event', done => {
    const client1 = io.connect(socketURL, options);
    expect.assertions(1);
    client1.on('joined', res => {
      expect(res).toBe('User2');
      client1.disconnect();
      client2.disconnect();
      done();
    });
    const client2 = io.connect(socketURL, options);
  });
  it('client2 should recive new message', done => {
    const client1 = io.connect(socketURL, options);
    const client2 = io.connect(socketURL, options);
    const msg = 'Hello!';
    expect.assertions(2);
    client2.on('connect', () => {
      client1.emit('new message', msg);
    });
    client2.on('new message', ({ message, username }) => {
      expect(message).toBe(msg);
      expect(username).toBe('User1');
      client1.disconnect();
      client2.disconnect();
      done();
    });
  });
  it('client2 should recive new name of client1', done => {
    const client1 = io.connect(socketURL, options);
    const client2 = io.connect(socketURL, options);
    const name = 'Chat user 1';
    expect.assertions(1);
    client2.on('connect', () => {
      client1.emit('set name', name);
    });
    client2.on('new name', ({ username }) => {
      expect(username).toBe(name);
      client1.disconnect();
      client2.disconnect();
      done();
    });
  });
  it('client2 should recive typing and stop typing event', done => {
    const client1 = io.connect(socketURL, options);
    const client2 = io.connect(socketURL, options);
    expect.assertions(2);
    client2.on('connect', () => {
      client1.emit('typing');
      client1.emit('stop typing');
    });
    client2.on('typing', ({ username }) => {
      expect(username).toBe('User1');
    });
    client2.on('stop typing', ({ username }) => {
      expect(username).toBe('User1');
      client1.disconnect();
      client2.disconnect();
      done();
    });
  });
});
