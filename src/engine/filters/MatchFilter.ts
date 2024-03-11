import User from "../models/User";

export default interface MatchFilter<T extends User> {
  id: string;

  validate(user: T): boolean;
}