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
  state.settings = val;
}

export function updateSettingsOnDeath(state, val) {
  state.settings.increaseOnDeath = val;
}
export function updateSettingsOnKill(state, val) {
  state.settings.increaseOnKill = val;
}
export function updateSettingsAmountDeath(state, val) {
  state.settings.increaseAmountDeath = val;
}
export function updateSettingsAmountKill(state, val) {
  state.settings.increaseAmountKill = val;
}
export function updateSettingsDefaultIntensity(state, val) {
  state.settings.defaultIntensity = val;
}
export function updateSettingsDefaultDuration(state, val) {
  state.settings.defaultDuration = val;
}
export function updateSettingsDeathDuration(state, val) {
  state.settings.increaseDurationDeath = val;
}
export function updateSettingsKillDuration(state, val) {
  state.settings.increaseDurationKill = val;
}

export function updatePiShockClientId(state, val) {
  state.piShockCreds.clientId = val;
}
