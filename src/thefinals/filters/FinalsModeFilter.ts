import MatchFilter from "../../engine/filters/MatchFilter";
import FinalsUser from "../FinalsUser";

export default class FinalsModeFilter implements MatchFilter<FinalsUser> {
  id: string;
  gamemode: string;

  constructor(gamemode: string) {
    this.id = 'mode_filter';
    this.gamemode = gamemode;
  }

  validate(user: FinalsUser): boolean {
    if(user.gamemode === 'all'){
      return true;
    }

    return user.gamemode === this.gamemode; 
  }
}