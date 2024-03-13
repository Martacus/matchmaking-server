import { expect, test, beforeEach } from 'bun:test';
import Match from './Match';  
import UserRequest from './models/User';
import MatchFilter from './filters/MatchFilter';
import FinalsUser from '../thefinals/FinalsUser';

const testUser = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', false, true, 0, 4);
let match: TestMatch;

beforeEach(() => {
  match	= new TestMatch(3);	
});

test('should initialise', () => {
  expect(match).toBeDefined();
  expect(match.maxUsers).toBe(3);
});

test('should add filter', () => {
  match.addFilter(new TestFilter());
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

class TestMatch extends Match<UserRequest> {}

class TestFilter implements MatchFilter<UserRequest> {
  id: string = 'test_filter';

  validate(user: UserRequest): boolean { 
    return true;
  }
}

class TestFilterInvalid implements MatchFilter<UserRequest> {
  id: string = 'test_filter';

  validate(user: UserRequest): boolean { 
    return false;
  }
}
