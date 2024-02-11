export default class User {
  id!: string;
  name: string;
  discordName: string;
  socketId: string;

  constructor(name: string, discordName: string, socketId: string) {
    this.name = name;
    this.discordName = discordName;
    this.socketId = socketId;
  }
}
