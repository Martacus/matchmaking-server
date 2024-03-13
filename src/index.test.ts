import { expect, test } from 'bun:test';
import FinalsRequest from './thefinals/FinalsUser';

test('handle finals request', () => {
  const user = new FinalsRequest('Martacus', 2, 'Martacus#1965', 'socket_id', 'all', false, true, 0, 4);
  
})