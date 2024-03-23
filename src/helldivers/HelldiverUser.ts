import UserRequest from "../engine/models/User";

export default class HelldiverUser extends UserRequest{
  level: number = 1;
  isDuo: boolean = false;
  isTrio: boolean = false;
  world: string = '';
  enemy: string = '';

  constructor(name: string, discordName: string, socketId: string) {
    super(name, discordName, socketId);
  }
  
}