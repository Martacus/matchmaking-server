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
