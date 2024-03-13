import { beforeEach, expect, test } from 'bun:test';
 
import Match from '../../engine/Match';
import FinalsUser from '../FinalsUser';
import FinalsMatch from '../FinalsMatch';
import { FinalsMaxUserFilter } from './FinalsMaxUserFilter';

let filter: FinalsMaxUserFilter;
let match: Match<FinalsUser>;

beforeEach(() => {
  match = new FinalsMatch(2);
  filter = new FinalsMaxUserFilter(2, match);
});

test('should initialize with correct maxUsers and match', () => {
  expect(filter.maxUsers).toBe(2);
  expect(filter.match).toBe(match);
});

test('should validate user correctly when user is not duo', () => {
  const user = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', false, false, 0, 4);
  expect(filter.validate(user)).toBe(true);
});

test('should validate user correctly when user is duo', () => {
  const user = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', true, false, 0, 4);
  expect(filter.validate(user)).toBe(true);
});

test('should not validate user when maxUsers is exceeded', () => {
  const user1 = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', false, false, 0, 4);
  const user2 = new FinalsUser('Another', 1, 'AnotherUser#1234', 'socket_id', 'all', false, false, 0, 4);
  match.users.push(user1, user2);
  const user3 = new FinalsUser('Third', 3, 'ThirdUser#5678', 'socket_id', 'all', false, false, 0, 4);
  expect(filter.validate(user3)).toBe(false);
});