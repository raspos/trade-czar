// tests/economy.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';

import { EconomyEngine } from '../dist/economy.mjs';
import { SCENARIOS } from '../dist/scenarios.mjs';
import { PRNG } from '../dist/prng.mjs';

test('EconomyEngine: mathematical exactness and 12-month simulation', () => {
  const prng = new PRNG(42);
  const scenario = SCENARIOS[0]; // baseline
  const engine = new EconomyEngine(scenario, 'bureaucrat', prng);

  for (let m = 1; m <= 12; m++) {
    const res = engine.simulateMonth(m);

    // 1. Check industry exports sum
    let indExpSum = 0;
    let indImpSum = 0;
    for (const ind of Object.values(res.industries)) {
      indExpSum += ind.export;
      indImpSum += ind.import;
    }
    assert.equal(Math.round(indExpSum * 100) / 100, res.export, `Month ${m} industry export sum must match total export`);
    assert.equal(Math.round(indImpSum * 100) / 100, res.import, `Month ${m} industry import sum must match total import`);

    // 2. Check partner exports sum
    let pExpSum = 0;
    let pImpSum = 0;
    for (const p of Object.values(res.partners)) {
      pExpSum += p.export;
      pImpSum += p.import;
    }
    assert.equal(Math.round(pExpSum * 100) / 100, res.export, `Month ${m} partner export sum must match total export`);
    assert.equal(Math.round(pImpSum * 100) / 100, res.import, `Month ${m} partner import sum must match total import`);

    // 3. Trade balance check
    assert.equal(Math.round((res.export - res.import) * 100) / 100, res.balance, `Month ${m} trade balance calculation`);
  }

  assert.equal(engine.monthlyResults.length, 12, '12 months simulated');
  assert.ok(engine.monthlyResults[11].cumulativeExport > 650, 'Annual export in realistic range');
});

test('EconomyEngine: seed reproducibility', () => {
  const seed = 987654321;
  
  const prng1 = new PRNG(seed);
  const engine1 = new EconomyEngine(SCENARIOS[1], 'industry_expert', prng1);
  const results1 = [];
  for (let m = 1; m <= 12; m++) results1.push(engine1.simulateMonth(m));

  const prng2 = new PRNG(seed);
  const engine2 = new EconomyEngine(SCENARIOS[1], 'industry_expert', prng2);
  const results2 = [];
  for (let m = 1; m <= 12; m++) results2.push(engine2.simulateMonth(m));

  assert.deepEqual(results1, results2, 'Simulations with identical seed must yield identical results');
});
