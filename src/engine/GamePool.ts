import Match from './Match';
import User from './models/User';
import FinalsUser from '../thefinals/FinalsRequest';

export default class GamePool {
  public id: string;
  public name: string;
  public ranked: boolean;
  public matches: Match[] = [];
  public users: FinalsUser[] = [];

  constructor(name: string, ranked: boolean) {
    this.name = name;
    this.ranked = ranked;
    this.id = crypto.randomUUID();
  }

  addUser(user: FinalsUser): Match {
    let forUsers = user.duo ? 2: 1;
    let match = this.findOpenMatch(forUsers);
    match.addUser(user);
    this.users.push(user);
    return match;
  }

  findOpenMatch(usersAmount: number): Match {
    let foundMatch = this.matches.find(
      (match) => match.maxUsers - match.userAmount() >= usersAmount,
    );

    if (!foundMatch) {
      const matchSize = usersAmount === 1 ? 3 : 2;
      foundMatch = new Match(matchSize);
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

  removeUser(user: FinalsUser): Match | undefined {
    const match = this.matches.find((match) => match.getUsers().includes(user));
    this.users = this.users.filter((filterUser) => filterUser.socketId !== user.socketId);
    if(match){
      match.removeUser(user);
      return match;
    } 
  }
}
