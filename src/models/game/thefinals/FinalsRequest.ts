import User from '../../User';

export default class FinalsRequest extends User {
  id!: String;
  rank: String;

  constructor(name: String, rank: String, discordName: String) {
    super(name, discordName);
    this.rank = rank;
  }
}
