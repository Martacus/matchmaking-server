import { beforeEach, expect, test } from 'bun:test';
 
import FinalsUser from '../FinalsUser';
import { FinalsRankFilter } from './FinalsRankFilter';
import FinalsMatch from '../FinalsMatch';

let filter: FinalsRankFilter;

beforeEach(() => {
  filter = new FinalsRankFilter(1, 5);
});

test('should initialize with correct lowerBound and upperBound', () => {
  expect(filter.lowerBound).toBe(1);
  expect(filter.upperBound).toBe(5);
});

test('should validate user correctly when user rank is within bounds', () => {
  const user = new FinalsUser('Martacus', 3, 'Martacus#1965', 'socket_id', 'all', false, true, 0, 4);
  expect(filter.validate(user, new FinalsMatch(3))).toBe(true);
});

test('should not validate user when user rank is below lowerBound', () => {
  const user = new FinalsUser('Martacus', 0, 'Martacus#1965', 'socket_id', 'all', false, true, 0, 4);
  expect(filter.validate(user, new FinalsMatch(3))).toBe(false);
});

test('should not validate user when user rank is above upperBound', () => {
  const user = new FinalsUser('Martacus', 6, 'Martacus#1965', 'socket_id', 'all', false, true, 0, 4);
  expect(filter.validate(user, new FinalsMatch(3))).toBe(false);
});