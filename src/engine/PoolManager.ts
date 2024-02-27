import GamePool from './GamePool';
import FinalsRequest from '../models/game/thefinals/FinalsRequest';
import User from '../models/User';

export default class PoolManager {
  public game: string;
  private pools: GamePool[] = [];

  constructor(game: string) {
    this.game = game;
  }

  addPool(pool: GamePool) {
    this.pools.push(pool);
  }

  getPool(matchRequest: FinalsRequest): GamePool | undefined {
    const poolName = matchRequest.ranked
      ? matchRequest.rank
      : `${matchRequest.rank}_${matchRequest.gamemode}`;
      
    return this.pools.find(
      (pool) => pool.name === poolName && pool.ranked === matchRequest.ranked,
    );
  }

  findPoolByUser(user: FinalsRequest): GamePool | undefined {
    return this.pools.find((pool) => pool.users.includes(user));
  }

  findUserBySocketId(socketId: string): FinalsRequest | undefined {
    return this.pools
      .flatMap((pool) => pool.users)
      .find((user) => user.socketId === socketId);
  }
}
