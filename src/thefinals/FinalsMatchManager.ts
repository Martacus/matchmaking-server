import Match from "../engine/Match";
import MatchManager from "../engine/MatchManager";
import FinalsMatch from "./FinalsMatch";
import FinalsUser from "./FinalsUser";
import FinalsMaxUserFilter from "./filters/FinalsMaxUserFilter";
import FinalsModeFilter from "./filters/FinalsModeFilter";
import FinalsRankFilter from "./filters/FinalsRankFilter";

export default class FinalsMatchManager extends MatchManager<FinalsUser> {
  
  createMatch(user: FinalsUser): Match<FinalsUser> {
    const match = new FinalsMatch(3);

    match.addFilter(new FinalsRankFilter(user.lowRank, user.highRank));
    match.addFilter(new FinalsMaxUserFilter(3, match));
    if(!user.ranked){
      match.addFilter(new FinalsModeFilter(user.gamemode));
    }

    return match;
  }
  
  
}