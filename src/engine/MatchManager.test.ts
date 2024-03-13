import { beforeEach, expect, test } from 'bun:test';

import MatchManager from './MatchManager';
import UserRequest from './models/User';
import Match from './Match';
import FinalsUser from '../thefinals/FinalsUser';


const testUser = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', false, true, 0, 4);
let matchManager: TestMatchManager;

beforeEach(() => {
  matchManager = new TestMatchManager();
});

test('should initialize with empty matches and userMatch', () => {
  expect(matchManager.matches).toEqual([]);
  expect(matchManager.userMatch).toEqual(new Map());
});

test('should find match correctly', () => {
  const match = matchManager.createMatch(testUser);
  expect(matchManager.findMatch(testUser)).toBe(match);
}); 

test('should not find match', () => { 
  expect(matchManager.findMatch(testUser)).toBeUndefined();
}); 


class TestMatch extends Match<UserRequest> {
  createValidation(user: UserRequest): void { 
  }
}

class TestMatchManager extends MatchManager<UserRequest> {
  createMatch(user: UserRequest): Match<UserRequest> {
    const match = new TestMatch(2);
    this.matches.push(match);
    return match;
  }
}