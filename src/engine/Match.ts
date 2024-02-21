import User from '../models/User';

export default class Match {
  private id: string;
  private users: User[] = [];
  public readonly maxUsers: number;

  constructor(maxUsers: number) {
    this.id = crypto.randomUUID();
    this.maxUsers = maxUsers;
  }

  addUser(user: User): boolean {
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
}
