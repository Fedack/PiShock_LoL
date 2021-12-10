export function someMutation(/* state */) {}

export function updateShockers(state, val) {
  state.piShockCreds.shockers = val;
}

export function updateShockersCode(state, val) {
  state.shockersCode = val;
}

export function updatePiShockUsername(state, val) {
  state.piShockCreds.username = val;
}

export function updatePiShockApiKey(state, val) {
  state.piShockCreds.key = val;
}

export function updateSettings(state, val) {
  Object.assign(state.settings, val);
}

export function updatepiShockCreds(state, piShockCreds) {
  Object.assign(state.piShockCreds, piShockCreds);
}

export function updateSettingsOnDeath(state, val) {
  state.settings.increaseOnDeath = val;
}
export function updateSettingsOnKill(state, val) {
  state.settings.increaseOnKill = val;
}
export function updateSettingsAmountDeath(state, val) {
  console.log(val);
  state.settings.increaseDeathAmount = val;
}
export function updateSettingsAmountKill(state, val) {
  console.log(val);
  state.settings.increaseKillAmount = val;
}
export function updateSettingsDefaultIntensity(state, val) {
  state.settings.defaultIntensity = val;
}
export function updateSettingsDefaultDuration(state, val) {
  state.settings.defaultDuration = val;
}
export function updateSettingsDeathDuration(state, val) {
  state.settings.increaseDeathDuration = val;
}
export function updateSettingsKillDuration(state, val) {
  state.settings.increaseKillDuration = val;
}

export function updatePiShockClientId(state, val) {
  state.piShockCreds.clientId = val;
}
