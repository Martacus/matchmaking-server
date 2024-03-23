import Match from './Match';
import UserRequest from './models/User';

export default abstract class MatchManager<T extends UserRequest> {
  public matches: Match<T>[] = [];
  public userMatch: Map<string, Match<T>> = new Map();

  findMatch(user: T): Match<T> | undefined {
    return this.matches.find((match) => match.validate(user));
  }

  removeMatch(match: Match<T>) {
    const matchIndex = this.matches.indexOf(match);
    if (matchIndex !== -1) {
      this.matches.splice(matchIndex, 1);
    }
    match.users.forEach((user) => this.userMatch.delete(user.socketId));
  }

  removeUser(socketId: string) {
    const match = this.userMatch.get(socketId);
    if (!match) return;
    match.users = match.users.filter((user) => user.socketId !== socketId);
    this.userMatch.delete(socketId);
  }

  addUser(user: T, match: Match<T>): void {
    if (!match.closed && match.users.length < match.maxUsers) {
      match.users.push(user);
      this.userMatch.set(user.socketId, match);
    }
  }

  abstract createMatch(user: T): Match<T>;

}
