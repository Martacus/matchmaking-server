import Match from './Match';
import User from './User';

export default class GamePool {
  public id: String;
  public rank: String;
  public ranked: boolean;
  public users: User[] = [];
  public matches: Match[] = [];

  constructor(rank: String, ranked: boolean) {
    this.rank = rank;
    this.ranked = ranked;
    this.id = crypto.randomUUID();
  }

  addUser(user: User) {
    this.users.push(user);
    console.log('User added to pool: ' + user);
    if (this.matches.length === 0) {
      let match = new Match(3);
      match.addUser(user);
      this.matches.push(match);
    } else {
      this.matches.forEach((match) => {
        if (match.userAmount() < match.maxUsers) {
          match.addUser(user);
          if(match.userAmount() === match.maxUsers){
            console.log('Match is full');
          }
        }
      });
    }

  }


}
