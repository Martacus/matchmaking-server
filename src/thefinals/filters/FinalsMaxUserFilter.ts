import Match from "../../engine/Match";
import MatchFilter from "../../engine/filters/MatchFilter";
import FinalsUser from "../FinalsUser";

export default class FinalsMaxUserFilter implements MatchFilter<FinalsUser>{
  id: string;
  maxUsers: number;
  match: Match<FinalsUser>;

  constructor(maxUsers: number, match: Match<FinalsUser>) {
    this.id = 'max_user_filter';
    this.maxUsers = maxUsers;
    this.match = match;
  }

  validate(user: FinalsUser): boolean {
    if(user.duo){
      if(this.match.users.length + 2 <= this.maxUsers){
        return true;
      }
    } else {
      if(this.match.users.length + 1 <= this.maxUsers){
        return true;
      }
    }

    return false;
  }
}