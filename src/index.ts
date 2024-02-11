import PoolManager from './models/PoolManager';
import FinalsRequest from './models/game/thefinals/FinalsRequest';
import GamePool from './models/GamePool';
import { Server } from 'socket.io';

import express from "express";
import { createServer } from 'node:http';

const app = express();
app.use(express.json())

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
  },
  pingInterval: 10000,
  pingTimeout: 5000
});

let managers: PoolManager[] = [];
managers.push(new PoolManager('thefinals'));

//Setup finals pools
const ranks = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];
ranks.forEach((rank) => {
  managers[0].addPool(new GamePool(rank+'_ranked', true));
  managers[0].addPool(new GamePool(rank, false));
  managers[0].addPool(new GamePool('all', false));
}); 

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});

io.on('connection', (socket) => {
  console.log(socket.id, ' connected'); 

  socket.on('finalsMatchRequest', (data) => {
    console.log('Message received from client for match request:', socket.id);
    const matchRequest = data.message as FinalsRequest;
    matchRequest.id = crypto.randomUUID();

    const pool = managers[0].getPool(matchRequest.rank);
    if (pool) { 
      let match = pool.addUser(matchRequest);
      console.log('user added to: ' + pool.id);
      console.log('emitting to: ' + matchRequest.socketId + ' with: ', match.getId());

      match.getUsers().forEach(user => {
        io.emit(user.socketId, match);
      }); 
    }
  }); 

  socket.on('sendMessage', (data) => {
    console.log('Message received from client:', data.message);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
  
});   

