import User from "./User";

export default class Match {
  private id: string;
  private users: User[] = [];
  public readonly maxUsers: number;

  constructor(maxUsers: number) {
    this.id = crypto.randomUUID();
    this.maxUsers = maxUsers;
  }

  addUser(user: User) {
    if (this.users.length < this.maxUsers) {
      this.users.push(user);
    }
  }

  userAmount() {
    return this.users.length;
  }

  getId(){
    return this.id;
  }

  getUsers(){
    return this.users;
  }
}