import GamePool from './GamePool';
import FinalsUser from '../thefinals/FinalsRequest'; 

export default class PoolManager {
  public game: string;
  public pools: GamePool[] = [];

  constructor(game: string) {
    this.game = game;
  }

  addPool(pool: GamePool) {
    this.pools.push(pool);
  }

  getPool(matchRequest: FinalsUser): GamePool | undefined {
    const poolName = matchRequest.ranked
      ? matchRequest.rank
      : `${matchRequest.rank}_${matchRequest.gamemode}`;
      
    return this.pools.find(
      (pool) => pool.name === poolName && pool.ranked === matchRequest.ranked,
    );
  }

  findPoolByUser(user: FinalsUser): GamePool | undefined {
    return this.pools.find((pool) => pool.users.includes(user));
  }

  findUserBySocketId(socketId: string): FinalsUser | undefined {
    return this.pools
      .flatMap((pool) => pool.users)
      .find((user) => user.socketId === socketId);
  }
}
