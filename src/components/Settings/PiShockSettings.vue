<template>
  <div>
    <q-btn
      color="dark"
      text-color="primary"
      outline
      label="Configuration"
      @click="dialog = !dialog"
    />
    <q-dialog v-model="dialog">
      <q-card class="bg-dark">
        <q-card-section>
          <q-input dark label="PiShock Username" v-model="username" /><q-input
            label="PiShock Api Key"
            v-model="key"
            dark
          /><q-input dark label="PiShock ID" v-model="id" /><q-btn
            label="Test / Get Shockers"
            class="full-width"
            color="primary"
            text-color="dark"
            @click="TestAPI"
          />
        </q-card-section>
        <q-card-section v-for="shocker in shockersRaw" :key="shocker.id">
          <q-input
            dark
            v-model="shocker.code"
            @blur="UpdateShockers"
            type="password"
            :label="shocker.name + ' Code'"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { api } from "boot/axios";

export default defineComponent({
  setup() {
    const $store = useStore();
    const username = computed({
      get: () => $store.state.data.piShockCreds.username,
      set: (val) => {
        $store.commit("data/updatePiShockUsername", val);
      },
    });
    const key = computed({
      get: () => $store.state.data.piShockCreds.key,
      set: (val) => {
        $store.commit("data/updatePiShockApiKey", val);
      },
    });
    const id = computed({
      get: () => $store.state.data.piShockCreds.clientId,
      set: (val) => {
        $store.commit("data/updatePiShockClientId", val);
      },
    });
    const shockers = computed({
      get: () => $store.state.data.piShockCreds.shockers,
      set: (val) => {
        $store.commit("data/updateShockers", val);
      },
    });
    return {
      username,
      key,
      id,
      shockers,
    };
  },
  data() {
    return {
      shockersRaw: [],
      dialog: false,
    };
  },
  mounted() {
    this.shockersRaw = JSON.parse(JSON.stringify(this.shockers));
  },
  methods: {
    TestAPI() {
      api
        .post("https://do.pishock.com/api/VerifyApiCredentials", {
          ApiKey: this.key,
          Username: this.username,
        })
        .then((res) => {
          console.log("Confirmed");
          this.GetShockers();
        })
        .catch((err) => {
          console.log("Wrong Credentials");
        });
    },
    UpdateShockers() {
      this.$store.commit(
        "data/updateShockers",
        JSON.parse(JSON.stringify(this.shockersRaw))
      );
      console.log(this.shockers);
    },
    GetShockers() {
      if (this.id !== "") {
        console.log("fetching shockers");
        api
          .post("https://do.pishock.com/api/GetShockers", {
            ApiKey: this.key,
            Username: this.username,
            ClientId: this.id,
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.length > 0) {
              res.data.forEach((element) => {
                element.code = "";
              });
              this.shockersRaw = res.data;
              this.UpdateShockers();
            }
          });
      }
    },
  },
});
</script>

<style></style>
