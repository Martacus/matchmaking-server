import Match from './Match';
import User from '../models/User';

export default class GamePool {
  public id: string;
  public name: string;
  public ranked: boolean;
  public matches: Match[] = [];
  public users: User[] = [];

  constructor(name: string, ranked: boolean) {
    this.name = name;
    this.ranked = ranked;
    this.id = crypto.randomUUID();
  }

  addUser(user: User): Match {
    let match = this.findOpenMatch();
    match.addUser(user);
    this.users.push(user);
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

  removeMatch(match: Match){
    match.getUsers().forEach((user) => {
      this.removeUser(user);
    });
    this.matches = this.matches.filter((m) => m !== match);
  }

  removeUser(user: User): Match | undefined {
    const match = this.matches.find((match) => match.getUsers().includes(user));
    this.users = this.users.filter((user) => user !== user);
    if(match){
      match.removeUser(user);
      return match;
    }
  }
}
