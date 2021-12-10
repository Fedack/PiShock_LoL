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
          <q-input
            dark
            v-on:keyup.stop="updateField('username', $event.target.value)"
            label="PiShock Username"
            :model-value="creds.username"
          /><q-input
            label="PiShock Api Key"
            :model-value="creds.key"
            v-on:keyup.stop="updateField('key', $event.target.value)"
            dark
          /><q-input
            dark
            v-on:keyup.stop="updateField('clientId', $event.target.value)"
            label="PiShock ID"
            :model-value="creds.clientId"
          /><q-btn
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
    const creds = computed({
      get: () => $store.state.data.piShockCreds,
    });
    return {
      creds,
    };
  },
  data() {
    return {
      shockersRaw: [],
      dialog: false,
    };
  },
  mounted() {
    this.shockersRaw = JSON.parse(JSON.stringify(this.creds.shockers));
  },
  methods: {
    updateField(field, value) {
      this.$store.commit("data/updatepiShockCreds", {
        [field]: value,
      });
    },
    TestAPI() {
      api
        .post("https://do.pishock.com/api/VerifyApiCredentials", {
          ApiKey: this.creds.key,
          Username: this.creds.username,
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
      console.log(this.creds.shockers);
    },
    GetShockers() {
      if (this.id !== "") {
        console.log("fetching shockers");
        api
          .post("https://do.pishock.com/api/GetShockers", {
            ApiKey: this.creds.key,
            Username: this.creds.username,
            ClientId: this.creds.clientId,
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
