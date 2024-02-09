import { Elysia } from 'elysia';
import PoolManager from './models/PoolManager';
import FinalsRequest from './models/game/thefinals/FinalsRequest';
import GamePool from './models/GamePool';

let managers: PoolManager[] = [];
managers.push(new PoolManager('thefinals'));

//Setup finals pools
const ranks = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];
ranks.forEach((rank) => {
  managers[0].addPool(new GamePool(rank, true));
  managers[0].addPool(new GamePool(rank, false));
  managers[0].addPool(new GamePool('all', false));
});

const app = new Elysia()
  .get('/', () => 'Hello Elysia')
  .post('/thefinals', (req) => {
    const matchRequest = req.body as FinalsRequest;
    matchRequest.id = crypto.randomUUID();

    const pool = managers[0].getPool(matchRequest.rank);
    if (pool) {
      pool.addUser(matchRequest);
      console.log(pool);
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
