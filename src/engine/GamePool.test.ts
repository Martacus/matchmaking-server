import { expect, test } from 'bun:test';
import GamePool from './GamePool';
import User from '../models/User';



test('Init GamePool', () => {
  const pool = new GamePool('test', true);
  expect(pool.name).toBe('test');
  expect(pool.ranked).toBe(true);
  expect(pool.matches.length).toBe(0);
});

test('should add a user to a non-existing match', () => {
  const pool = new GamePool('test', true);
  pool.addUser(new User('test_name', 'test_discord_name', 'test_socket_id'));
  expect(pool.matches.length).toBe(1);  
  expect(pool.matches[0].getUsers()[0].name).toBe('test_name');  
});

test('addUser adds a user to an existing match that is not full', () => {
  const gamePool = new GamePool('Test Pool', true);
  const user1 = new User('test_name', 'test_discord_name', 'test_socket_id');  
  const user2 = new User('test_name_2', 'test_discord_name_2', 'test_socket_id_2');  

  gamePool.addUser(user1);
  const match = gamePool.addUser(user2);

  expect(gamePool.matches.length).toBe(1); 
  expect(match.getUsers().includes(user2)).toBe(true);  
});

test('addUser creates a new match if existing matches are full', () => {
  const gamePool = new GamePool('Test Pool', true);
  const user1 = new User('test_name', 'test_discord_name', 'test_socket_id');  
  const user2 = new User('test_name_2', 'test_discord_name_2', 'test_socket_id_2');   
  const user3 = new User('test_name_3', 'test_discord_name_3', 'test_socket_id_3');  

  gamePool.addUser(user1);
  gamePool.addUser(user2);
  gamePool.addUser(user3);

  const newMatch = gamePool.addUser(user3);

  expect(gamePool.matches.length).toBe(2); 
  expect(newMatch.getUsers().includes(user3)).toBe(true); 
});
