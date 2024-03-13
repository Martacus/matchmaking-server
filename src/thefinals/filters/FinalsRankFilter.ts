import MatchFilter from "../../engine/filters/MatchFilter";
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

  validate(user: FinalsUser): boolean {
    return (user.rank >= this.lowerBound && user.rank <= this.upperBound);
  }

}