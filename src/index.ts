import PoolManager from './models/PoolManager';
import FinalsRequest from './models/game/thefinals/FinalsRequest';
import GamePool from './models/GamePool';
import { Server, Socket } from 'socket.io';

import express from "express";
import { createServer } from 'node:http';

const ranks = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'all'];
const gamemodes = ['quick_cash', 'bank_it', 'tournament'];

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json())

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
  pingInterval: 10000,
  pingTimeout: 5000
});

let managers: PoolManager[] = [];
managers.push(new PoolManager('thefinals'));
createFinalsRankedPools();

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log(socket.id, ' connected');

  socket.on('finalsMatchRequest', (data) => {
    console.log('Message received from client for match request:', socket.id);
    const matchRequest = data.message as FinalsRequest;
    handleFinalsRequest(matchRequest, socket);
  });

  socket.on('sendMessage', (data) => {
    console.log('Message received from client:', data.message);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });

});

function createFinalsRankedPools() {
  ranks.forEach((rank) => {
    managers[0].addPool(new GamePool(rank, true));
  });

  ranks.forEach((rank) => {
    gamemodes.forEach((gamemode) => {
      managers[0].addPool(new GamePool(rank + '_' + gamemode, false));
    });
  });
}

function handleFinalsRequest(matchRequest: FinalsRequest, socket: Socket) {
  const pool = managers[0].getPool(matchRequest);
  if (pool) {
    let match = pool.addUser(matchRequest);
    console.log('user added to: ' + pool.id);
    console.log('emitting to: ' + matchRequest.socketId + ' with: ', match.getId());

    match.getUsers().forEach(user => {
      if (user.socketId !== socket.id) {
        socket.broadcast.emit(user.socketId, match);
      } else {
        socket.emit(user.socketId, match);
      }

    });
  }
}

