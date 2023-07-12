import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { PORT } from './config';
import { GameServer } from './modules/GameServer';

const app = express();
app.use(express.static(path.join(__dirname, '../../client/dist')));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});
new GameServer(io).start();

server.listen(PORT, () => {
  console.log(`Listening on *:${PORT}`);
});
