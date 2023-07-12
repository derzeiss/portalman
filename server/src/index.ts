import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import http from 'http';
import path from 'path';
import { SERVER_PORT } from 'portalman_shared';
import { Server } from 'socket.io';
import { ServerApplication } from './modules/ServerApplication';

const app = express();
app.use(express.static(path.join(__dirname, '../../client/dist')));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://localhost:4173'],
  },
});

new ServerApplication(io);

server.listen(SERVER_PORT, () => {
  console.log(`Listening on *:${SERVER_PORT}`);
});
