import UserRequest from './models/User';
import FinalsUser from '../thefinals/FinalsRequest';
import MatchFilter from './filters/MatchFilter';

export default abstract class Match<T extends UserRequest> {
  private id: string;
  public users: FinalsUser[] = [];
  public readonly maxUsers: number;
  public closed: boolean = false;

  public filters: MatchFilter<T>[] = [];

  constructor(maxUsers: number) {
    this.id = crypto.randomUUID();
    this.maxUsers = maxUsers;
  }

  validate(user: T): boolean {
    let valid = true;
    this.filters.forEach((filter) => {
      valid = valid && filter.validate(user);
    });
    return true;
  }

  addFilter(filter: MatchFilter<T>) {
    this.filters.push(filter);
  }

  abstract createValidation(user: T): void;

  // //

  // addUser(user: FinalsUser): boolean {
  //   if (this.users.length >= this.maxUsers) {
  //     return false;
  //   }
  //   this.users.push(user);
  //   return true;
  // }

  // userAmount() {
  //   return this.users.length;
  // }

  // getId() {
  //   return this.id;
  // }

  // getUsers() {
  //   return this.users;
  // }

  // removeUser(user: UserRequest) {
  //   this.users = this.users.filter((filterUser) => filterUser !== user);
  // }

  // close() {
  //   this.closed = true;
  // }
}
