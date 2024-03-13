import MatchManager from './engine/MatchManager';
import FinalsUser from './thefinals/FinalsRequest';
import GamePool from './engine/GamePool';
import { Server, Socket } from 'socket.io';

import express from 'express';
import { createServer } from 'node:http';
import Match from './engine/Match';
import UserRequest from './engine/models/User';
import FinalsMatchManager from './thefinals/FinalsMatchManager';

const ranks = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'all'];
const gamemodes = ['quick_cash', 'bank_it', 'tournament', 'any'];

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

let managers = new Map<string, MatchManager<any>>();
managers.set('finals', new FinalsMatchManager());  

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log(socket.id, ' connected');

  socket.on('finals', (data) => {
    console.log('Message received from client for match request:', socket.id);
    const matchRequest = data.message as FinalsUser; 
    handleRequest('finals', matchRequest, socket);
  });

  socket.on('disconnect', (reason) => {
    // const user = managers[0].findUserBySocketId(socket.id);
    // if (!user) {
    //   console.log(`ERROR: User with socket ID ${socket.id} not found.`);
    //   return;
    // }
    
    // const pool = managers[0].findPoolByUser(user);
    // if (!pool) {
    //   console.log(`ERROR: Pool for user ${user.name} not found.`);
    //   return;
    // } 

    // const match = pool.removeUser(user);
    // if (!match) {
    //   console.log(`ERROR: Failed to remove user ${user.name} from match.`);
    //   return;
    // }

    // if(match.userAmount() === 0){
    //   pool.removeMatch(match);
    //   return;
    // }
    
    // broadCastMatchToPlayers(match, socket);
  });
});

function handleRequest(game: string, matchRequest: FinalsUser, socket: Socket) {
  const manager = managers.get(game);
  if(!manager) return;

  let match = manager.findMatch(matchRequest);
  if(!match){
    manager.createMatch(matchRequest);
  }

  // if (pool) {
  //   let match = pool.addUser(matchRequest);

  //   broadCastMatchToPlayers(match, socket);
  //   if(match.userAmount() >= match.maxUsers){
  //     match.close();
  //     //Close all connections on a timer
  //     setTimeout(() => {
  //       match.getUsers().forEach((user) => {
  //         const userSocket = io.sockets.sockets.get(user.socketId);
  //         if(userSocket){
  //           userSocket.disconnect(true);
  //         }
  //       });
  //       //Remove match from pool
  //       pool.removeMatch(match);
  //     }, 5000);
  //   }
  // }
}

// function broadCastMatchToPlayers(match: Match, socket: Socket){
//   if(match.closed) return;
//   match.getUsers().forEach((user) => {
//     if (user.socketId !== socket.id) {
//       socket.broadcast.emit(user.socketId, match);
//       console.log('Emitted broadcast')
//     } else {
//       socket.emit(user.socketId, match);
//       console.log('emitted message to self')
//     }
//   });
// }

