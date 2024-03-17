import Match from "../../engine/Match";
import MatchFilter from "../../engine/filters/MatchFilter";
import FinalsUser from "../FinalsUser";

export class FinalsMaxUserFilter implements MatchFilter<FinalsUser>{
  id: string;
  maxUsers: number; 

  constructor(maxUsers: number) {
    this.id = 'max_user_filter';
    this.maxUsers = maxUsers; 
  }

  validate(user: FinalsUser, match: Match<FinalsUser>): boolean {
    const increment = user.duo ? 2 : 1;
    return match.users.length + increment <= this.maxUsers;
  } 
}