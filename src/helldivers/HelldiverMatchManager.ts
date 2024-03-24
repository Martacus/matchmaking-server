import Match from "../engine/Match";
import MatchManager from "../engine/MatchManager";
import HelldiverUser from "./HelldiverUser";
import HDEnemyFilter from "./filters/HDEnemyFilter";
import HDLevelFilter from "./filters/HDLevelFilter";
import HDWorldFilter from "./filters/HDWorldFilter";

export default class HelldiverMatchManager extends MatchManager<HelldiverUser> {

  addUser(user: HelldiverUser, match: Match<HelldiverUser>): void {
    super.addUser(user, match);
    if (user.isDuo) {
      match.maxUsers = match.maxUsers - 1;
    } else if (user.isTrio) {
      match.maxUsers = match.maxUsers - 2;
    }
  }

  createMatch(user: HelldiverUser): Match<HelldiverUser> {
    let match = new Match<HelldiverUser>(4);
    match.addFilter(new HDEnemyFilter(user.enemy));
    match.addFilter(new HDWorldFilter(user.world));
    match.addFilter(new HDLevelFilter(user.levelLowerBound, user.levelUpperBound));
    this.addUser(user, match);
    this.matches.push(match);
    return match;
  }

}