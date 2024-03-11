import { expect, test } from 'bun:test';
import GamePool from './GamePool';
import User from './models/User';
import FinalsUser from '../thefinals/FinalsRequest';

test('Init GamePool', () => {
  const pool = new GamePool('test', true);
  expect(pool.name).toBe('test');
  expect(pool.ranked).toBe(true);
  expect(pool.matches.length).toBe(0);
});

test('should add a user to a non-existing match', () => {
  const pool = new GamePool('test', true);
  pool.addUser(new FinalsUser('test_name', 0, 'test_socket_id', '', '', false, false));
  expect(pool.matches.length).toBe(1);  
  expect(pool.matches[0].getUsers()[0].name).toBe('test_name');  
});

test('addUser adds a user to an existing match that is not full', () => {
  const gamePool = new GamePool('Test Pool', true);
  const user1 = new FinalsUser('test_name', 0, 'test_socket_id', '', '', false, false);  
  const user2 = new FinalsUser('test_name_2', 0, 'test_socket_id_2', '', '', false, false);  

  gamePool.addUser(user1);
  const match = gamePool.addUser(user2);

  expect(gamePool.matches.length).toBe(1); 
  expect(match.getUsers().includes(user2)).toBe(true);  
});

test('addUser creates a new match if existing matches are full', () => {
  const gamePool = new GamePool('Test Pool', true);
  const user = new FinalsUser('test_name', 0, 'test_socket_id', '', '', false, false); 

  gamePool.addUser(user);
  gamePool.addUser(user);
  gamePool.addUser(user);

  const newMatch = gamePool.addUser(user);

  expect(gamePool.matches.length).toBe(2); 
  expect(newMatch.getUsers().includes(user)).toBe(true); 
});
