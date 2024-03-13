import Match from "../engine/Match";
import FinalsUser from "./FinalsUser";

export default class FinalsMatch extends Match<FinalsUser>{
  
  constructor(maxUsers: number) {
    super(3);
  }

}