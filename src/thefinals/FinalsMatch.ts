import Match from "../engine/Match";
import FinalsUser from "./FinalsRequest";

export default class FinalsMatch extends Match<FinalsUser>{
  
  constructor(maxUsers: number) {
    super(3);
  }

  createValidation(user: FinalsUser): void {
    throw new Error("Method not implemented.");
  }

}