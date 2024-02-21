import User from '../../User';

export default class FinalsRequest extends User {
  rank: string;
  gamemode: string;
  duo!: boolean;
  ranked!: boolean;

  constructor(
    name: string,
    rank: string,
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
