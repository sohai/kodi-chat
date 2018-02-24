import express from 'express';
import config from './config';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let userCounter = 0;

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

  socket.on('disconnect', () => userCounter--);
  socket.on('new message', data => {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });
});

server.listen(config.port, function listenHandler() {
  console.info(`Running on ${config.port}...`);
});
