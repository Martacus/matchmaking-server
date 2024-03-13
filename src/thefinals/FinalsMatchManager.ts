import Match from "../engine/Match";
import MatchManager from "../engine/MatchManager";
import FinalsMatch from "./FinalsMatch";
import FinalsUser from "./FinalsUser"; 
import { FinalsMaxUserFilter, FinalsModeFilter, FinalsRankFilter } from "./filters";

export default class FinalsMatchManager extends MatchManager<FinalsUser> {
  
  createMatch(user: FinalsUser): Match<FinalsUser> {
    const match = new FinalsMatch(3);

    match.addFilter(new FinalsRankFilter(user.lowRank, user.highRank));
    match.addFilter(new FinalsMaxUserFilter(3, match));
    if(!user.ranked){
      match.addFilter(new FinalsModeFilter(user.gamemode));
    }

    match.users.push(user);
    this.userMatch.set(user.socketId, match);
    this.matches.push(match);
    return match;
  }
  
}