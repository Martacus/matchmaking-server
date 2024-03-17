import Match from "../engine/Match";
import MatchManager from "../engine/MatchManager";
import FinalsMatch from "./FinalsMatch";
import FinalsUser from "./FinalsUser"; 
import { FinalsMaxUserFilter, FinalsModeFilter, FinalsRankFilter } from "./filters";

export default class FinalsMatchManager extends MatchManager<FinalsUser> {
  
  createMatch(user: FinalsUser): Match<FinalsUser> {
    let maxUsers: number = 3;
    if(user.duo){
      maxUsers = 2;
    }
    let match = new FinalsMatch(maxUsers);
    

    match.addFilter(new FinalsRankFilter(user.lowRank, user.highRank));
    match.addFilter(new FinalsMaxUserFilter(maxUsers));
    if(!user.ranked){
      match.addFilter(new FinalsModeFilter(user.gamemode));
    }

    match.users.push(user);
    this.userMatch.set(user.socketId, match);
    this.matches.push(match);
    return match;
  }
  
}