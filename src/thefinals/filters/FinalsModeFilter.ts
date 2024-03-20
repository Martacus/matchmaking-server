import Match from "../../engine/Match";
import MatchFilter from "../../engine/filters/MatchFilter";
import FinalsUser from "../FinalsUser";

export class FinalsModeFilter implements MatchFilter<FinalsUser> {
  id: string;
  gamemode: string;

  constructor(gamemode: string) {
    this.id = 'mode_filter';
    this.gamemode = gamemode;
  }

  validate(user: FinalsUser, match: Match<FinalsUser>): boolean {
    return user.gamemode === 'any' || user.gamemode === this.gamemode;
  }
}