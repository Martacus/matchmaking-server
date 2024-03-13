import Match from './Match';
import UserRequest from './models/User';

export default abstract class MatchManager<T extends UserRequest> { 
  public matches: Match<T>[] = [];
  public userMatch: Map<string, Match<T>> = new Map();

  findMatch(user: T): Match<T> | undefined {
    return this.matches.find((match) => match.validate(user));
  }

  abstract createMatch(user: T): Match<T>;

  // //

  // addPool(pool: GamePool) {
  //  // this.pools.push(pool);
  // }

  // getPool(matchRequest: FinalsUser): GamePool | undefined {
  //   // const poolName = matchRequest.ranked
  //   //   ? matchRequest.rank
  //   //   : `${matchRequest.rank}_${matchRequest.gamemode}`;
      
  //   // return this.pools.find(
  //   //   (pool) => pool.name === poolName && pool.ranked === matchRequest.ranked,
  //   // );
  //   return undefined;
  // }

  // findPoolByUser(user: FinalsUser): GamePool | undefined {
  //   return undefined; //this.pools.find((pool) => pool.users.includes(user));
  // }

  // findUserBySocketId(socketId: string): FinalsUser | undefined {
  //   return this.matches
  //     .flatMap((pool) => pool.users)
  //     .find((user) => user.socketId === socketId);
  // }
}
