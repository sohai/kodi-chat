import express from 'express';
import config from './config';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  res.render('index');
});

io.on('connection', function (socket) {
  socket.emit('out', { hello: 'world' });
  socket.on('in', function (data) {
    console.log(data);
  });
});

server.listen(config.port, function listenHandler() {
  console.info(`Running on ${config.port}...`);
});
