import { expect, test } from "bun:test";
import GamePool from "./GamePool";

test('Init GamePool', () => {
  const pool = new GamePool("test", true);
  expect(pool.name).toBe("test");
  expect(pool.ranked).toBe(true);
  expect(pool.matches.length).toBe(0);
});

test('', () => {

})