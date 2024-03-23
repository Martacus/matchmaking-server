import { beforeEach, expect, test } from 'bun:test';
 
import FinalsUser from '../thefinals/FinalsUser';
import FinalsMatchManager from '../thefinals/FinalsMatchManager';

let matchManager: FinalsMatchManager;
const testUser = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id1', 'all', false, true, 0, 4);
const additionalUser = new FinalsUser('OtherPlayer', 2, 'OtherPlayer#1234', 'socket_id2', 'all', false, true, 0, 4);

beforeEach(() => {
  matchManager = new FinalsMatchManager();
});

// Existing tests...

test('should remove user from match and userMatch', () => {
  const match = matchManager.createMatch(testUser);
  matchManager.addUser(additionalUser, match);
  matchManager.removeUser(additionalUser.socketId);
  expect(match.users).not.toContain(additionalUser);
  expect(matchManager.userMatch.has(additionalUser.socketId)).toBe(false);
});

test('should remove match correctly', () => {
  const match = matchManager.createMatch(testUser);
  matchManager.removeMatch(match);
  expect(matchManager.matches).not.toContain(match);
  expect(matchManager.userMatch.has(testUser.socketId)).toBe(false);
});

test('should not find a removed match', () => {
  const match = matchManager.createMatch(testUser);
  matchManager.removeMatch(match);
  expect(matchManager.findMatch(testUser)).toBeUndefined();
});

test('addUser should increase users in match', () => {
  const match = matchManager.createMatch(testUser);
  matchManager.addUser(additionalUser, match);
  expect(match.users.length).toBe(2);
  expect(match.users).toContain(additionalUser);
  expect(matchManager.userMatch.get(additionalUser.socketId)).toBe(match);
});

test('closing a match prevents adding new users', () => {
  const match = matchManager.createMatch(testUser);
  match.close();  
  matchManager.addUser(additionalUser, match); 
  expect(match.users).not.toContain(additionalUser);
});

test('should create match with correct initial state', () => {
  const match = matchManager.createMatch(testUser);
  expect(match).toBeDefined();
  expect(match.maxUsers).toBeGreaterThan(0);  
  expect(match.closed).toBe(false); 
});

test('addUser should not add users to full matches', () => {
  const match = matchManager.createMatch(testUser); 
  for (let i = 0; i < match.maxUsers - 1; i++) {
    matchManager.addUser(new FinalsUser(`ExtraUser${i}`, 2, `ExtraUser#${i}`, `extra_socket_id${i}`, 'all', false, true, 0, 4), match);
  }
  matchManager.addUser(additionalUser, match);
  expect(match.users.length).toBe(match.maxUsers);
  expect(match.users).not.toContain(additionalUser); // Assuming match refuses addition due to being full
});

test('match should not be found after all users are removed', () => {
  const match = matchManager.createMatch(testUser);
  matchManager.removeUser(testUser.socketId);
  // Assuming removing the last user doesn't automatically delete the match
  expect(matchManager.userMatch.get(testUser.socketId)).toBeUndefined();
});