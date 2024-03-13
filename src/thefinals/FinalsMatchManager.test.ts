import { beforeEach, expect, test } from 'bun:test';

import FinalsMatchManager from './FinalsMatchManager';
import FinalsUser from '../thefinals/FinalsUser';
import FinalsMatch from '../thefinals/FinalsMatch';

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
  expect(match).toBeInstanceOf(FinalsMatch);
  expect(matchManager.matches).toContain(match);
});

test('should find match correctly', () => {
  const match = matchManager.createMatch(testUser);
  expect(matchManager.findMatch(testUser)).toBe(match);
});

test('should not find match', () => {
  expect(matchManager.findMatch(testUser)).toBeUndefined();
});