import Match from './Match';
import User from '../models/User';

export default class GamePool {
  public id: string;
  public name: string;
  public ranked: boolean;
  public matches: Match[] = [];

  constructor(name: string, ranked: boolean) {
    this.name = name;
    this.ranked = ranked;
    this.id = crypto.randomUUID();
  }

  addUser(user: User): Match {
    let match = this.findOpenMatch();
    match.addUser(user);
    return match;
  }

  findOpenMatch(): Match {
    let foundMatch = this.matches.find(
      (match) => match.userAmount() < match.maxUsers,
    );

    if (!foundMatch) {
      foundMatch = new Match(3);
      this.matches.push(foundMatch);
    }

    return foundMatch;
  }
}
