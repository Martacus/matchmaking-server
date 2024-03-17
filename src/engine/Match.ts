import UserRequest from './models/User';
import FinalsUser from '../thefinals/FinalsUser';
import MatchFilter from './filters/MatchFilter';

export default abstract class Match<T extends UserRequest> {
  public id: string;
  public users: FinalsUser[] = [];
  public readonly maxUsers: number;
  public closed: boolean = false;

  public filters: MatchFilter<T>[] = [];

  constructor(maxUsers: number) {
    this.id = crypto.randomUUID();
    this.maxUsers = maxUsers;
  }

  validate(user: T): boolean {
    return this.filters.every(filter => filter.validate(user, this));
  }

  addFilter(filter: MatchFilter<T>) {
    this.filters.push(filter);
  }

  close() {
    this.closed = true;
  }

}
