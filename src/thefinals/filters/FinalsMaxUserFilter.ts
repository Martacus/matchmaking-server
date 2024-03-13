import Match from "../../engine/Match";
import MatchFilter from "../../engine/filters/MatchFilter";
import FinalsUser from "../FinalsUser";

export class FinalsMaxUserFilter implements MatchFilter<FinalsUser>{
  id: string;
  maxUsers: number;
  match: Match<FinalsUser>;

  constructor(maxUsers: number, match: Match<FinalsUser>) {
    this.id = 'max_user_filter';
    this.maxUsers = maxUsers;
    this.match = match;
  }

  validate(user: FinalsUser): boolean {
    const increment = user.duo ? 2 : 1;
    return this.match.users.length + increment <= this.maxUsers;
  }
}