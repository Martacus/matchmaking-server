import Match from './Match';
import UserRequest from './models/User';

export default abstract class MatchManager<T extends UserRequest> { 
  public matches: Match<T>[] = [];
  public userMatch: Map<string, Match<T>> = new Map();

  findMatch(user: T): Match<T> | undefined {
    return this.matches.find((match) => match.validate(user));
  }

  removeMatch(match: Match<T>) {
    match.users.forEach((user) => this.userMatch.delete(user.socketId));
    this.matches = this.matches.filter((matchItem) => matchItem !== match);
  }

  removeUser(socketId: string) {
    const match = this.userMatch.get(socketId);
    if(!match) return;
    match.users = match.users.filter((user) => user.socketId !== socketId);
    this.userMatch.delete(socketId);
  }

  abstract createMatch(user: T): Match<T>;

}
