import Match from "../engine/Match";
import MatchManager from "../engine/MatchManager";
import FinalsUser from "./FinalsUser"; 
import { FinalsMaxUserFilter, FinalsModeFilter, FinalsRankFilter } from "./filters";

export default class FinalsMatchManager extends MatchManager<FinalsUser> {
  
  addUser(user: FinalsUser, match: Match<FinalsUser>): void {
    super.addUser(user, match);
    if(user.duo){
      match.maxUsers = match.maxUsers -1;
    }
  }
  
  createMatch(user: FinalsUser): Match<FinalsUser> {
    let match = new Match<FinalsUser>(3);
    this.addUser(user, match);
    
    match.addFilter(new FinalsRankFilter(user.lowRank, user.highRank));
    match.addFilter(new FinalsMaxUserFilter(match.maxUsers));
    if(!user.ranked){
      match.addFilter(new FinalsModeFilter(user.gamemode));
    }
    
    return match;
  }
  
}