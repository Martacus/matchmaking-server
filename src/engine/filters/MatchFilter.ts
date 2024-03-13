import UserRequest from "../models/User";

export default interface MatchFilter<T extends UserRequest> {
  id: string;

  validate(user: T): boolean;
}