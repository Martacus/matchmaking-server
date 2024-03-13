import Match from './Match';
import UserRequest from './models/User';

export default abstract class MatchManager<T extends UserRequest> { 
  public matches: Match<T>[] = [];
  public userMatch: Map<string, Match<T>> = new Map();

  findMatch(user: T): Match<T> | undefined {
    return this.matches.find((match) => match.validate(user));
  }

  abstract createMatch(user: T): Match<T>;

}
