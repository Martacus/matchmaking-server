import User from '../engine/models/User';

export default class FinalsUser extends User {
  rank: number;
  gamemode: string;
  duo!: boolean;
  lowRank!: number;
  highRank!: number;
  ranked!: boolean; 

  constructor(
    name: string,
    rank: number,
    discordName: string,
    socketId: string,
    gamemode: string,
    duo: boolean,
    ranked: boolean,
  ) {
    super(name, discordName, socketId);
    this.rank = rank;
    this.gamemode = gamemode;
    this.duo = duo;
    this.ranked = ranked;
  }
}
