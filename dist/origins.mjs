// origins.mjs - Player origin selection and perks

import { ORIGINS } from './constants.mjs';

export function getOrigin(originId) {
  return ORIGINS[originId] || ORIGINS.bureaucrat;
}

export function applyOriginModifiers(origin, state) {
  const cfg = getOrigin(origin);
  // Apply initial political stats
  state.presidentTrust = cfg.initialStats.presidentTrust;
  state.businessTrust = cfg.initialStats.businessTrust;
  state.diplomaticTrust = cfg.initialStats.diplomaticTrust;
  state.publicApproval = cfg.initialStats.publicApproval;
  state.policyMomentum = cfg.initialStats.policyMomentum;
  state.competitiveness = cfg.initialStats.competitiveness;

  return state;
}
