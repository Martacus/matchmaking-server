import { beforeEach, expect, test } from 'bun:test';
 
import FinalsUser from '../FinalsUser';
import { FinalsModeFilter } from './FinalsModeFilter';
import FinalsMatch from '../FinalsMatch';

let filter: FinalsModeFilter;

beforeEach(() => {
  filter = new FinalsModeFilter('all');
});

test('should initialize with correct gamemode', () => {
  expect(filter.gamemode).toBe('all');
});

test('should validate user correctly when user gamemode is all', () => {
  const user = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', false, true, 0, 4);
  expect(filter.validate(user, new FinalsMatch(3))).toBe(true);
});

test('should validate user correctly when user gamemode matches filter gamemode', () => {
  const user = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', false, true, 0, 4);
  const filter = new FinalsModeFilter(user.gamemode);
  expect(filter.validate(user, new FinalsMatch(3))).toBe(true);
});

test('should not validate user when user gamemode does not match filter gamemode', () => {
  const user = new FinalsUser('Martacus', 2, 'Martacus#1965', 'socket_id', 'solo', false, true, 0, 4);
  expect(filter.validate(user, new FinalsMatch(3))).toBe(false);
});