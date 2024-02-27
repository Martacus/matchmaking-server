import User from '../models/User';
import FinalsRequest from '../models/game/thefinals/FinalsRequest';

export default class Match {
  private id: string;
  private users: FinalsRequest[] = [];
  public readonly maxUsers: number;
  public closed: boolean = false;

  constructor(maxUsers: number) {
    this.id = crypto.randomUUID();
    this.maxUsers = maxUsers;
  }

  addUser(user: FinalsRequest): boolean {
    if (this.users.length >= this.maxUsers) {
      return false;
    }
    this.users.push(user);
    return true;
  }

  userAmount() {
    return this.users.length;
  }

  getId() {
    return this.id;
  }

  getUsers() {
    return this.users;
  }

  removeUser(user: User) {
    this.users = this.users.filter((filterUser) => filterUser !== user);
  }

  close() {
    this.closed = true;
  }
}
