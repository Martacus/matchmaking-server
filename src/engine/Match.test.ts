import { expect, test } from 'bun:test';
import Match from './Match'; 
import FinalsUser from '../thefinals/FinalsRequest';

test('addUser successfully adds a user when under maxUsers limit', () => {
  const match = new Match(2);
  const user = new FinalsUser('test_name', 'test_discord_name', 'test_socket_id', '', '', false, false);
  const result = match.addUser(user);
  expect(result).toBe(true);
  expect(match.userAmount()).toBe(1);
});

test('addUser fails to add a user when at maxUsers limit', () => {
  const match = new Match(1);
  const user1 = new FinalsUser('test_name', 'test_discord_name', 'test_socket_id', '', '', false, false);
  const user2 = new FinalsUser('test_name_2', 'test_discord_name_2', 'test_socket_id_2', '', '', false, false);
  match.addUser(user1);
  const result = match.addUser(user2);
  expect(result).toBe(false);
  expect(match.userAmount()).toBe(1);
});

test('removeUser successfully removes a user', () => {
  const match = new Match(2);
  const user = new FinalsUser('test_name', 'test_discord_name', 'test_socket_id', '', '', false, false);
  match.addUser(user);
  match.removeUser(user); 
  expect(match.userAmount()).toBe(0);
});

test('close marks the match as closed', () => {
  const match = new Match(2);
  match.close();
  expect(match.closed).toBe(true);
});

test('getId returns the match ID', () => {
  const match = new Match(2);
  const id = match.getId();
  expect(typeof id).toBe('string');
  expect(id.length).toBeGreaterThan(0);
});