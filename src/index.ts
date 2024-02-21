import PoolManager from './engine/PoolManager';
import FinalsRequest from './models/game/thefinals/FinalsRequest';
import GamePool from './engine/GamePool';
import { Server, Socket } from 'socket.io';

import express from 'express';
import { createServer } from 'node:http';
import Match from './engine/Match';

const ranks = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'all'];
const gamemodes = ['quick_cash', 'bank_it', 'tournament'];

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
  pingInterval: 10000,
  pingTimeout: 5000,
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

  socket.on('disconnect', (reason) => {
    const user = managers[0].findUserBySocketId(socket.id);
    if (!user) {
      console.log(`User with socket ID ${socket.id} not found.`);
      return;
    }
    
    const pool = managers[0].findPoolByUser(user);
    if (!pool) {
      console.log(`Pool for user ${user.name} not found.`);
      return;
    }

    const match = pool.removeUser(user);
    if (!match) {
      console.log(`Failed to remove user ${user.name} from match.`);
      return;
    }
    
    console.log(`User ${user.name} removed from match in pool ${pool.name}.`);
    broadCastMatchToPlayers(match, socket);
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
    console.log(
      'emitting to: ' + matchRequest.socketId + ' with: ',
      match.getId(),
    );

    broadCastMatchToPlayers(match, socket);
    if(match.userAmount() >= match.maxUsers){
      //Close all connections
      match.getUsers().forEach((user) => {
        const userSocket = io.sockets.sockets.get(user.socketId);
        if(userSocket){
          socket.disconnect(true);
        }
      });
      //Remove match from pool
      pool.removeMatch(match);
      console.log('Full match found, removing from pool: ' + pool.id);
    }
  }
}

function broadCastMatchToPlayers(match: Match, socket: Socket){
  match.getUsers().forEach((user) => {
    if (user.socketId !== socket.id) {
      socket.broadcast.emit(user.socketId, match);
    } else {
      socket.emit(user.socketId, match);
    }
  });
}

