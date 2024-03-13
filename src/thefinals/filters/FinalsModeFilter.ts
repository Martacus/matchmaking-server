import MatchFilter from "../../engine/filters/MatchFilter";
import FinalsUser from "../FinalsUser";

export class FinalsModeFilter implements MatchFilter<FinalsUser> {
  id: string;
  gamemode: string;

  constructor(gamemode: string) {
    this.id = 'mode_filter';
    this.gamemode = gamemode;
  }

  validate(user: FinalsUser): boolean {
    return user.gamemode === 'all' || user.gamemode === this.gamemode;
  }
}