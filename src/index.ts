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
  console.log(`Server running on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log(socket.id, ' connected');

  socket.on('finals', (data) => {
    console.log('Message received from client for match request:', socket.id); 
    handleFinalsRequest('finals', data.message as FinalsUser, socket);
  });

  socket.on('disconnect', () => {
    handleDisconnect(socket);
  });
});

function handleFinalsRequest(game: string, matchRequest: FinalsUser, socket: Socket) { 
  const manager = managers.get(game);
  if(!manager) return;

  let match = manager.findMatch(matchRequest);
  if(!match){
    match = manager.createMatch(matchRequest);
  } else {
    match.users.push(matchRequest);
    manager.userMatch.set(socket.id, match);
    if(matchRequest.duo){
      match.maxUsers = match.maxUsers -1;
    }
  }

  broadCastMatchToPlayers(match, socket);
  handleFullMatch(match, manager);
}

function broadCastMatchToPlayers(match: Match<any>, socket: Socket){
  if(match.closed) return;
  match.users.forEach((user) => {
    if (user.socketId !== socket.id) {
      socket.broadcast.emit(user.socketId, match); 
    } else {
      socket.emit(user.socketId, match); 
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
  console.log("LOG: handleDisconnect -> socket.id", socket.id)
  const managerEntry = Array.from(managers.entries()).find(([key, value]) => { 
    if(value.userMatch.has(socket.id)){
      return value;
    }
  });
  if(!managerEntry) return;
  const manager = managerEntry[1];
  const match = manager.userMatch.get(socket.id);
  const user = match?.getUser(socket.id);

  console.log("LOG: remove user from manager & match");	
  manager.removeUser(socket.id); 
  if(!match) return;
  if(match.users.length === 0){
    manager.removeMatch(match);
    return;
  } 
  
  broadCastMatchToPlayers(match, socket);
}

