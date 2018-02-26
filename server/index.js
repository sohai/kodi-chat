import express from 'express';
import config from '../config';
import http from 'http';
import socketIO from 'socket.io';
import { emotify } from './utils';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let userCounter = 0;
const userToSocketMap = {};

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  res.render('index');
});

io.on('connection', socket => {
  if (userCounter > 1) {
    socket.emit('maximum user number exceeded', config.userLimit);
    socket.disconnect();
    return;
  }
  userCounter++;
  socket.username = `User${userCounter}`;
  const initMsg = [socket.username, ...Object.keys(userToSocketMap)].join(',');
  userToSocketMap[socket.username] = socket;
  socket.emit('init', initMsg);
  socket.broadcast.emit('joined', socket.username);
  socket.on('disconnect', () => {
    delete userToSocketMap[socket.username];
    userCounter--;
  });
  socket.on('new message', ({ message, variant }) => {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message,
      variant
    });
  });
  socket.on('set name', data => {
    socket.username = data;
    socket.broadcast.emit('new name', socket.username);
  });
  socket.on('oops', () => {
    socket.broadcast.emit('oops', socket.username);
  });
  socket.on('typing', isTyping => {
    socket.broadcast.emit('typing', isTyping);
  });
});

server.listen(config.port, function listenHandler() {
  console.info(`Running on ${config.port}...`);
});
