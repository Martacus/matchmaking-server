import { beforeEach, expect, test } from 'bun:test';

import FinalsMatchManager from './FinalsMatchManager';
import FinalsUser from '../thefinals/FinalsUser';

const testUser = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', false, true, 0, 4);
let matchManager: FinalsMatchManager;

beforeEach(() => {
  matchManager = new FinalsMatchManager();
});

test('should initialize with empty matches and userMatch', () => {
  expect(matchManager.matches).toEqual([]);
  expect(matchManager.userMatch).toEqual(new Map());
});

test('should create match correctly', () => {
  const match = matchManager.createMatch(testUser);
  expect(matchManager.matches).toContain(match);
  expect(match.users).toContain(testUser);
  expect(matchManager.userMatch.get(testUser.socketId)).toBe(match);
});

test('should find match correctly', () => {
  const match = matchManager.createMatch(testUser);
  expect(matchManager.findMatch(testUser)).toBe(match);
});

test('should not find match', () => {
  expect(matchManager.findMatch(testUser)).toBeUndefined();
});