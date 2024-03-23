import { expect, test, beforeEach } from 'bun:test';
import Match from './Match'; 
import MatchFilter from './filters/MatchFilter';

// Assuming FinalsUser is compatible with UserRequest
import FinalsUser from '../thefinals/FinalsUser';

const testUser = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', false, true, 0, 4);
let match: Match<FinalsUser>; // Use FinalsUser for specificity if needed

beforeEach(() => {
  match = new Match<FinalsUser>(3); // Adjusted to use Match directly
});

test('should initialise', () => {
  expect(match).toBeDefined();
  expect(match.maxUsers).toBe(3);
});

test('should add filter', () => {
  const filter = new TestFilter();
  match.addFilter(filter);
  expect(match.filters.length).toBe(1);
  expect(match.filters[0].id).toBe('test_filter');
});

test('should validate', () => {
  match.addFilter(new TestFilter());
  expect(match.validate(testUser)).toBe(true);
});

test('should not validate', () => {
  match.addFilter(new TestFilterInvalid());
  expect(match.validate(testUser)).toBe(false);
});

test('should add users to the match', () => {
  match.users.push(testUser); // Directly adding user for simplicity, assuming a method exists
  const anotherUser = new FinalsUser('JaneDoe', 3, 'JaneDoe#1234', 'socket_id2', 'all', true, false, 1, 5);
  match.users.push(anotherUser);
  expect(match.users.length).toBe(2);
  expect(match.users).toContain(testUser);
  expect(match.users).toContain(anotherUser);
});

// Test for getting a user by socket ID
test('should get a user by socket ID', () => {
  match.users.push(testUser);
  const retrievedUser = match.getUser(testUser.socketId);
  expect(retrievedUser).toBeDefined();
  expect(retrievedUser?.socketId).toBe(testUser.socketId);
});

test('match closure should set closed to true', () => {
  match.close();
  expect(match.closed).toBe(true);
});

class TestFilter implements MatchFilter<FinalsUser> {
  id: string = 'test_filter';

  validate(user: FinalsUser, match: Match<FinalsUser>): boolean {
    return true;
  }
}

class TestFilterInvalid implements MatchFilter<FinalsUser> {
  id: string = 'test_filter_invalid';

  validate(user: FinalsUser, match: Match<FinalsUser>): boolean {
    return false;
  }
}