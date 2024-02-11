import Match from './Match';
import User from './User';
import FinalsRequest from './game/thefinals/FinalsRequest';

export default class GamePool {
  public id: String;
  public rank: String;
  public ranked: boolean; 
  public matches: Match[] = [];

  constructor(rank: String, ranked: boolean) {
    this.rank = rank;
    this.ranked = ranked;
    this.id = crypto.randomUUID();
  }

  addUser(user: User): Match {  
    let match = this.findOpenMatch();
    match.addUser(user);
    if (match.userAmount() === match.maxUsers) {
      console.log('Match is full');
    } 

    return match;
  }

  findOpenMatch(): Match {
    let foundMatch: Match | undefined;
    this.matches.forEach((match) => {
      console.log('lookin for match: ' + match.userAmount())
      if (match.userAmount() < match.maxUsers) {
        foundMatch = match;
        return;
      }
    });

    if(!foundMatch){
      foundMatch = new Match(3)
      foundMatch.addUser(new FinalsRequest('test_name', 'bronze', 'test_disc_name', 'test_client_id'));
      this.matches.push(foundMatch);
    }
    
    return foundMatch;
  }

}
