import User from '../../User';

export default class FinalsRequest extends User { 
  rank: string;

  constructor(name: string, rank: string, discordName: string, socketId: string) {
    super(name, discordName, socketId);
    this.rank = rank; 
  }
}
