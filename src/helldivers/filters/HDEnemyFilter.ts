import Match from "../../engine/Match";
import MatchFilter from "../../engine/filters/MatchFilter";
import HelldiverUser from "../HelldiverUser";

export default class HDEnemyFilter implements MatchFilter<HelldiverUser>{
  id: string = 'enemy_filter';
  enemy: string;

  constructor(enemy: string) {
    this.enemy = enemy;
  }

  validate(user: HelldiverUser, match: Match<HelldiverUser>): boolean {
    return user.enemy === this.enemy;
  }
}