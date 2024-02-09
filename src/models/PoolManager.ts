import GamePool from './GamePool';

export default class PoolManager {
  public game: String;
  private pools: GamePool[] = [];

  constructor(game: String) {
    this.game = game;
  }

  addPool(pool: GamePool) {
    this.pools.push(pool);
  }

  getPool(poolType: String): GamePool | undefined {
    return this.pools.find((pool) => pool.rank === poolType);
  }
}
