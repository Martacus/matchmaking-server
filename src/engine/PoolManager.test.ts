import { expect, test } from 'bun:test';
import PoolManager from './PoolManager'; // Update the path as necessary
import GamePool from './GamePool'; // Update the path as necessary
import FinalsUser from '../thefinals/FinalsRequest';

test('addPool successfully adds a GamePool', () => {
  const poolManager = new PoolManager('Test Game');
  const pool = new GamePool('Ranked', true);
  poolManager.addPool(pool);
  expect(poolManager.pools.length).toBe(1);
});

test('getPool returns the correct pool based on matchRequest', () => {
  const poolManager = new PoolManager('thefinals');
  const rankedPool = new GamePool('gold', true);
  poolManager.addPool(rankedPool);
  
  const matchRequest = new FinalsUser('test_name', 'gold', 'test_socket_id', 'gamemode', '', false, true);
  rankedPool.addUser(matchRequest);

  const foundPool = poolManager.getPool(matchRequest);

  expect(foundPool).toBeDefined();
  expect(foundPool?.name).toBe('gold');
  expect(foundPool?.ranked).toBe(true);
});

test('findPoolByUser returns the correct pool containing the user', () => {
  const poolManager = new PoolManager('Test Game');
  const pool = new GamePool('Casual', false);
  const user = new FinalsUser('test_name', 'test_discord_name', 'test_socket_id', '', 'casual', false, false);
  pool.addUser(user);
  poolManager.addPool(pool);

  const foundPool = poolManager.findPoolByUser(user);
  expect(foundPool).toBeDefined();
  expect(foundPool?.name).toBe('Casual');
});

test('findUserBySocketId returns the correct user', () => {
  const poolManager = new PoolManager('Test Game');
  const pool = new GamePool('gold', true);
  const user = new FinalsUser('test_name', 'gold', 'discord_name', 'test_socket_id', 'casual', false, true);
  poolManager.addPool(pool);
  pool.addUser(user);

  const foundUser = poolManager.findUserBySocketId('test_socket_id');
  expect(foundUser).toBeDefined();
  expect(foundUser?.name).toBe('test_name');
  expect(foundUser?.socketId).toBe('test_socket_id');
});