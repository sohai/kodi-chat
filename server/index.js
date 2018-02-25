import express from 'express';
import config from '../config';
import http from 'http';
import socketIO from 'socket.io';

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
  socket.on('new message', data => {
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });
  socket.on('set name', data => {
    socket.username = data;
    socket.broadcast.emit('new name', {
      username: socket.username
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
