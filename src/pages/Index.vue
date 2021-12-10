<template>
  <q-page class="flex flex-center bg-dark column"
    ><q-card class="q-my-md">
      <q-card-section horizontal
        ><q-card-section
          ><div class="column">
            <span class="self-center text-overline">Deaths</span
            ><span>Current: {{ score["deaths"] }}</span
            ><span>Intensity: {{ intensityOnDeath }}</span
            ><span>Duration: {{ durationOnDeath }}</span>
          </div></q-card-section
        ><q-card-section
          ><div class="column">
            <span class="self-center text-overline">Kills</span
            ><span>Current: {{ score["kills"] + score["assists"] }}</span
            ><span>Intensity: {{ intensityOnKill }}</span
            ><span>Duration: {{ durationOnKill }}</span>
          </div></q-card-section
        ></q-card-section
      ></q-card
    ><q-card
      ><q-card-section
        ><div class="column">
          <div class="self-center text-h6"><span>Default</span></div>
          <div class="row q-gutter-md justify-between">
            <q-input
              type="number"
              label="Intensity"
              v-model="defaultIntensity"
            />
            <q-input type="number" label="Duration" v-model="defaultDuration" />
          </div>
          <div class="self-center text-h6"><span>Increase On Event</span></div>
          <div class="row q-gutter-md justify-between">
            <q-toggle label="On Death" v-model="onDeath" />
            <div>
              <q-input type="number" label="Intensity" v-model="amountDeath" />
              <q-input type="number" label="Duration" v-model="durationDeath" />
            </div>
          </div>

          <div class="row q-gutter-md justify-between">
            <q-toggle label="On Kill" v-model="onKill" />
            <div>
              <q-input
                type="number"
                label="Intensity"
                v-model="amountKill"
              /><q-input
                label="Duration"
                type="number"
                v-model="durationKill"
              />
            </div>
          </div></div></q-card-section></q-card
    ><q-btn
      class="q-my-md"
      v-if="isStarted === false"
      outlined
      text-color="primary"
      label="Start"
      @click="getPlayerName" />
    <q-btn
      class="q-my-md"
      v-else
      outlined
      text-color="primary"
      label="Stop"
      @click="stop" /><q-page-sticky :offset="[10, 10]" position="bottom-right"
      ><pi-shock-settings /></q-page-sticky
  ></q-page>
</template>

<script>
import PiShockSettings from "src/components/Settings/PiShockSettings.vue";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { api } from "boot/axios";

export default defineComponent({
  components: { PiShockSettings },
  name: "PageIndex",

  setup() {
    const $store = useStore();
    const creds = computed({
      get: () => $store.state.data.piShockCreds,
    });
    const onDeath = computed({
      get: () => $store.state.data.settings.increaseOnDeath,
      set: (val) => {
        $store.commit("data/updateSettingsOnDeath", val);
      },
    });
    const onKill = computed({
      get: () => $store.state.data.settings.increaseOnKill,
      set: (val) => {
        $store.commit("data/updateSettingsOnKill", val);
      },
    });
    const amountDeath = computed({
      get: () => $store.state.data.settings.increaseDeathAmount,
      set: (val) => {
        $store.commit("data/updateSettingsAmountDeath", parseInt(val));
      },
    });
    const amountKill = computed({
      get: () => $store.state.data.settings.increaseKillAmount,
      set: (val) => {
        $store.commit("data/updateSettingsAmountKill", parseInt(val));
      },
    });
    const durationKill = computed({
      get: () => $store.state.data.settings.increaseKillDuration,
      set: (val) => {
        $store.commit("data/updateSettingsKillDuration", parseInt(val));
      },
    });
    const durationDeath = computed({
      get: () => $store.state.data.settings.increaseDeathDuration,
      set: (val) => {
        $store.commit("data/updateSettingsDeathDuration", parseInt(val));
      },
    });
    const defaultIntensity = computed({
      get: () => $store.state.data.settings.defaultIntensity,
      set: (val) => {
        $store.commit("data/updateSettingsDefaultIntensity", parseInt(val));
      },
    });
    const defaultDuration = computed({
      get: () => $store.state.data.settings.defaultDuration,
      set: (val) => {
        $store.commit("data/updateSettingsDefaultDuration", parseInt(val));
      },
    });

    return {
      creds,
      onDeath,
      onKill,
      amountDeath,
      amountKill,
      durationKill,
      durationDeath,
      defaultIntensity,
      defaultDuration,
    };
  },
  computed: {
    intensityOnDeath() {
      let total = parseInt(this.defaultIntensity);
      if (this.onDeath) {
        let currentDeathInt = this.score.deaths * parseInt(this.amountDeath);
        total += currentDeathInt;
      }
      if (total > 100) {
        total = 100;
      }
      return total;
    },
    intensityOnKill() {
      let total = parseInt(this.defaultIntensity);
      if (this.onKill) {
        let currentDeathInt =
          (this.score.kills + this.score.assists) * parseInt(this.amountKill);
        total += currentDeathInt;
      }
      if (total > 100) {
        total = 100;
      }
      return total;
    },
    durationOnDeath() {
      let total = parseInt(this.defaultDuration);
      if (this.onDeath) {
        let currentDeathDuration =
          this.score.deaths * parseInt(this.durationDeath);
        total += currentDeathDuration;
      }
      if (total > 15) {
        total = 15;
      }
      return total;
    },
    durationOnKill() {
      let total = parseInt(this.defaultDuration);
      if (this.onKill) {
        let currentKillDuration =
          (this.score.kills + this.score.assists) * parseInt(this.durationKill);
        total += currentKillDuration;
      }
      if (total > 15) {
        total = 15;
      }
      return total;
    },
  },
  data() {
    return {
      playerName: "",
      score: {
        assists: 0,
        creepScore: 0,
        deaths: 0,
        kills: 0,
        wardScore: 0.0,
      },
      isStarted: false,
      queryScoreInterval: null,
    };
  },
  methods: {
    stop() {
      clearInterval(this.queryScoreInterval);
      this.isStarted = false;
    },
    getPlayerName() {
      api.get("activeplayername").then((res) => {
        console.log(res);
        this.playerName = res.data;
        this.queryScoreInterval = this.getScores();
        this.isStarted = true;
      });
    },
    getScores() {
      return setInterval(() => {
        api.get("playerscores?summonerName=" + this.playerName).then((res) => {
          console.log(res);
          this.processScore(res.data);
        });
      }, 500);
    },
    processScore(newScore) {
      if (newScore.deaths > this.score.deaths) {
        this.score = newScore;
        if (this.creds.shockers.length > 0) {
          let code = this.getRandomShockerCode();
          this.SendPiShockRequest(
            code,
            this.intensityOnDeath,
            this.durationOnDeath,
            this.creds.username,
            0
          );
        }
      }
      if (
        newScore.assists > this.score.assists ||
        newScore.kills > this.score.kills
      ) {
        this.score = newScore;
        if (this.creds.shockers.length > 0) {
          let code = this.getRandomShockerCode();
          this.SendPiShockRequest(
            code,
            this.intensityOnKill,
            this.durationOnKill,
            this.creds.username,
            0
          );
        }
      }
    },
    getRandomShockerCode() {
      let selectShockerIndex = Math.floor(
        Math.random() * this.creds.shockers.length
      );
      console.log(selectShockerIndex);
      let randomElement = this.creds.shockers[selectShockerIndex];
      console.log(randomElement);
      return randomElement.code;
    },
    SendPiShockRequest(shockerCode, intensity, duration, username, method) {
      api
        .post("https://do.pishock.com/api/apioperate", {
          ApiKey: this.creds.key,
          Username: this.creds.username,
          Code: shockerCode,
          Duration: duration,
          Intensity: intensity,
          Name: username,
          Method: method,
        })
        .then((res) => {
          console.log(res.data);
        });
    },
  },
});
</script>
