// generate_baseline.mjs
import { writeFileSync, readFileSync } from 'node:fs';

const hsMapping = JSON.parse(readFileSync(new URL('./hs_mapping.json', import.meta.url), 'utf8'));

const monthFactors = [
  { month: 1, name: '1월', days: 31, expWeight: 0.92, impWeight: 1.02, fx: 1410.5, brent: 78.4, scfi: 2150, globalDemand: 99.5 },
  { month: 2, name: '2월', days: 28, expWeight: 0.86, impWeight: 0.90, fx: 1415.2, brent: 79.1, scfi: 2080, globalDemand: 99.2 },
  { month: 3, name: '3월', days: 31, expWeight: 1.04, impWeight: 1.04, fx: 1405.0, brent: 81.3, scfi: 1980, globalDemand: 100.1 },
  { month: 4, name: '4월', days: 30, expWeight: 0.97, impWeight: 0.97, fx: 1398.4, brent: 82.5, scfi: 1920, globalDemand: 100.4 },
  { month: 5, name: '5월', days: 31, expWeight: 0.99, impWeight: 0.98, fx: 1392.1, brent: 80.8, scfi: 1940, globalDemand: 100.7 },
  { month: 6, name: '6월', days: 30, expWeight: 1.06, impWeight: 1.01, fx: 1385.6, brent: 79.2, scfi: 2010, globalDemand: 101.2 },
  { month: 7, name: '7월', days: 31, expWeight: 0.95, impWeight: 0.96, fx: 1382.0, brent: 77.8, scfi: 2050, globalDemand: 100.8 },
  { month: 8, name: '8월', days: 31, expWeight: 0.93, impWeight: 0.94, fx: 1388.5, brent: 76.5, scfi: 2020, globalDemand: 100.5 },
  { month: 9, name: '9월', days: 30, expWeight: 1.07, impWeight: 1.02, fx: 1395.2, brent: 75.9, scfi: 1970, globalDemand: 101.4 },
  { month: 10, name: '10월', days: 31, expWeight: 0.98, impWeight: 0.96, fx: 1402.7, brent: 77.2, scfi: 1930, globalDemand: 101.0 },
  { month: 11, name: '11월', days: 30, expWeight: 1.03, impWeight: 1.05, fx: 1412.3, brent: 78.6, scfi: 1960, globalDemand: 101.8 },
  { month: 12, name: '12월', days: 31, expWeight: 1.20, impWeight: 1.15, fx: 1420.0, brent: 80.1, scfi: 2090, globalDemand: 102.5 }
];

const totalExport = hsMapping.totals2026.totalExport;
const totalImport = hsMapping.totals2026.totalImport;

const monthlyData = monthFactors.map(m => {
  const mExp = Math.round((totalExport * (m.expWeight / 12)) * 100) / 100;
  const mImp = Math.round((totalImport * (m.impWeight / 12)) * 100) / 100;
  const mBal = Math.round((mExp - mImp) * 100) / 100;

  // Industry breakdown
  const industries = {};
  let indExpSum = 0;
  let indImpSum = 0;

  hsMapping.industries.forEach((ind, idx) => {
    let e = Math.round((ind.annualExport2026 * (m.expWeight / 12)) * 100) / 100;
    let i = Math.round((ind.annualImport2026 * (m.impWeight / 12)) * 100) / 100;
    if (idx === hsMapping.industries.length - 1) {
      // adjust residual to match mExp and mImp exactly
      e = Math.round((mExp - indExpSum) * 100) / 100;
      i = Math.round((mImp - indImpSum) * 100) / 100;
    } else {
      indExpSum += e;
      indImpSum += i;
    }
    industries[ind.id] = {
      id: ind.id,
      name: ind.name,
      export: e,
      import: i,
      balance: Math.round((e - i) * 100) / 100,
      capacityIndex: 100.0,
      utilizationRate: ind.id === 'semiconductor' ? 94.5 : (ind.id === 'automobile' ? 88.2 : 82.0),
      globalDemandIndex: m.globalDemand,
      priceCompetitiveness: 100.0,
      tradeBarrierIndex: ind.id === 'steel' ? 125.0 : (ind.id === 'automobile' ? 110.0 : 100.0)
    };
  });

  // Country breakdown
  const partners = {};
  let pExpSum = 0;
  let pImpSum = 0;
  hsMapping.tradingPartners.forEach((p, idx) => {
    let e = Math.round((p.export * (m.expWeight / 12)) * 100) / 100;
    let i = Math.round((p.import * (m.impWeight / 12)) * 100) / 100;
    if (idx === hsMapping.tradingPartners.length - 1) {
      e = Math.round((mExp - pExpSum) * 100) / 100;
      i = Math.round((mImp - pImpSum) * 100) / 100;
    } else {
      pExpSum += e;
      pImpSum += i;
    }
    partners[p.id] = {
      id: p.id,
      name: p.name,
      export: e,
      import: i,
      balance: Math.round((e - i) * 100) / 100
    };
  });

  return {
    month: m.month,
    name: m.name,
    days: m.days,
    export: mExp,
    import: mImp,
    balance: mBal,
    macro: {
      fxRate: m.fx,
      brentOil: m.brent,
      scfiFreight: m.scfi,
      globalDemandIndex: m.globalDemand,
      usFedRate: 4.50,
      bokBaseRate: 3.00
    },
    industries,
    partners
  };
});

const baseline2026 = {
  year: 2026,
  source: "관세청 수출입무역통계 및 산업통상자원부 확정치/추계 기반 2026 기준선",
  totals: {
    export: totalExport,
    import: totalImport,
    balance: Math.round((totalExport - totalImport) * 100) / 100
  },
  months: monthlyData
};

writeFileSync(new URL('./baseline_2026.json', import.meta.url), JSON.stringify(baseline2026, null, 2), 'utf8');
console.log('Successfully generated baseline_2026.json');
