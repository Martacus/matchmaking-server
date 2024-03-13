import UserRequest from '../engine/models/User';

export default class FinalsUser extends UserRequest {
  rank: number;
  gamemode: string;
  duo: boolean;
  lowRank: number;
  highRank: number;
  ranked: boolean; 

  constructor(
    name: string,
    rank: number,
    discordName: string,
    socketId: string,
    gamemode: string,
    duo: boolean,
    ranked: boolean,
    lowRank: number,
    highRank: number
  ) {
    super(name, discordName, socketId);
    this.rank = rank;
    this.gamemode = gamemode;
    this.duo = duo;
    this.ranked = ranked;
    this.lowRank = lowRank;
    this.highRank = highRank;
  }
}