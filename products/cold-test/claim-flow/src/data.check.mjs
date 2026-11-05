// Run: node src/data.check.mjs. Fails if the money or date logic breaks.
import assert from 'node:assert';
import { estimate, coverLeft, addWorkingDays, seedClaims, day } from './data.js';
assert.strictEqual(coverLeft(seedClaims), 362000);
assert.deepStrictEqual(estimate(48200, 'meera', 362000), { share: 4820, back: 43380, capped: false });
assert.deepStrictEqual(estimate(400000, 'ananya', 362000), { share: 0, back: 362000, capped: true });
assert.strictEqual(day(addWorkingDays('2026-11-06T10:12:00+05:30', 10)), '20\u00a0Nov');
console.log('data checks passed');
