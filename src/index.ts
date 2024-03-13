import MatchManager from './engine/MatchManager';
import FinalsUser from './thefinals/FinalsUser';
import { Server, Socket } from 'socket.io';

import express from 'express';
import { createServer } from 'node:http';
import FinalsMatchManager from './thefinals/FinalsMatchManager';
import Match from './engine/Match';

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
    handleRequest('finals', data.message as FinalsUser, socket);
  });

  socket.on('disconnect', () => {
    handleDisconnect(socket);
  });
});

function handleRequest(game: string, matchRequest: FinalsUser, socket: Socket) {
  const manager = managers.get(game);
  if(!manager) return;

  let match = manager.findMatch(matchRequest);
  if(!match){
    match = manager.createMatch(matchRequest);
  }

  broadCastMatchToPlayers(match, socket);
  handleFullMatch(match, manager);
}

function broadCastMatchToPlayers(match: Match<any>, socket: Socket){
  if(match.closed) return;
  match.users.forEach((user) => {
    if (user.socketId !== socket.id) {
      socket.broadcast.emit(user.socketId, match);
      console.log('Emitted broadcast')
    } else {
      socket.emit(user.socketId, match);
      console.log('emitted message to self')
    }
  });
}

function handleFullMatch(match: Match<any>, manager: MatchManager<any>){
  if(match.users.length >= match.maxUsers){
    match.close(); 
    setTimeout(() => {
      match?.users.forEach((user) => {
        const userSocket = io.sockets.sockets.get(user.socketId);
        if(userSocket){
          userSocket.disconnect(true);
        }
      }); 
      manager.removeMatch(match);
    }, 5000);
  }
}

function handleDisconnect(socket: Socket) {
  const managerEntry = Array.from(managers.entries()).find(([key, value]) => { 
    if(value.userMatch.has(socket.id)){
      return value;
    }
  });
  if(!managerEntry) return;
  const manager = managerEntry[1];
  manager.removeUser(socket.id);

  const match = manager.userMatch.get(socket.id);
  if(!match) return;
  if(match.users.length === 0){
    manager.removeMatch(match);
    return;
  }
  
  broadCastMatchToPlayers(match, socket);
}

