import { beforeEach, expect, test } from 'bun:test';
import Match from '../../engine/Match';
import FinalsUser from '../FinalsUser';
import { FinalsMaxUserFilter } from './FinalsMaxUserFilter';

let filter: FinalsMaxUserFilter;

beforeEach(() => {
  filter = new FinalsMaxUserFilter(2);
});

test('should initialize with correct maxUsers', () => {
  expect(filter.maxUsers).toBe(2);
});

test('should validate user correctly when user is not duo', () => {
  const user = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', false, false, 0, 4);
  expect(filter.validate(user, new Match<FinalsUser>(3))).toBe(true);
});

test('should validate user correctly when user is duo', () => {
  const user = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', true, false, 0, 4);
  expect(filter.validate(user, new Match<FinalsUser>(3))).toBe(true);
});

test('should not validate user when maxUsers is exceeded', () => {
  const user1 = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', false, false, 0, 4);
  const user2 = new FinalsUser('Another', 1, 'AnotherUser#1234', 'socket_id', 'all', false, false, 0, 4);
  const match = new Match<FinalsUser>(2);
  match.users.push(user1, user2);
  const user3 = new FinalsUser('Third', 3, 'ThirdUser#5678', 'socket_id', 'all', false, false, 0, 4);
  expect(filter.validate(user3, match)).toBe(false);
});