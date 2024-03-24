import Match from "../../engine/Match";
import MatchFilter from "../../engine/filters/MatchFilter";
import HelldiverUser from "../HelldiverUser";

export default class HDWorldFilter implements MatchFilter<HelldiverUser>{
  id: string = 'world_filter';
  world: string;

  constructor(world: string) {
    this.world = world;
  }

  validate(user: HelldiverUser, match: Match<HelldiverUser>): boolean {
    return user.world === this.world;
  }
}