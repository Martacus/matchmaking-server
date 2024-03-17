import Match from "../../engine/Match";
import MatchFilter from "../../engine/filters/MatchFilter";
import FinalsMatch from "../FinalsMatch";
import FinalsUser from "../FinalsUser";

export class FinalsRankFilter implements MatchFilter<FinalsUser>{
  public id: string;
  public lowerBound: number;
  public upperBound: number;

  constructor(lowerBound: number, upperBound: number) {
    this.id = 'ranked_filter';
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
  } 

  validate(user: FinalsUser, match: Match<FinalsUser>): boolean {
    if (
      user.rank < this.lowerBound ||
      user.rank > this.upperBound ||
      match.users.some(u => u.rank < user.lowRank || u.rank > user.highRank)
    ) {
      return false;
    }
    
    return true;
  }

}