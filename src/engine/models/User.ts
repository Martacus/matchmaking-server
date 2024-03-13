export default class UserRequest {
  socialName: string;
  discordName: string;
  socketId: string;

  constructor(name: string, discordName: string, socketId: string) {
    this.socialName = name;
    this.discordName = discordName;
    this.socketId = socketId;
  }
}