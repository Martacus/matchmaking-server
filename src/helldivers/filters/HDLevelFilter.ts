import Match from "../../engine/Match";
import MatchFilter from "../../engine/filters/MatchFilter";
import HelldiverUser from "../HelldiverUser";

export default class HDLevelFilter implements MatchFilter<HelldiverUser>{
  public id: string;
  public lowerBound: number;
  public upperBound: number;

  constructor(lowerBound: number, upperBound: number) {
    this.id = 'ranked_filter';
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;
  } 

  validate(user: HelldiverUser, match: Match<HelldiverUser>): boolean {
    if (
      user.level < this.lowerBound ||
      user.level > this.upperBound ||
      match.users.some(u => u.level < user.levelLowerBound || u.level > user.levelUpperBound)
    ) {
      return false;
    }
    
    return true;
  }

}