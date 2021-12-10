<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-bar class="bg-transparent q-electron-drag">
        <q-space />
        <q-btn dense flat color="dark" icon="minimize" @click="minimize" />
        <q-btn
          dense
          flat
          color="dark"
          icon="crop_square"
          @click="toggleMaximize"
        />
        <q-btn dense flat color="dark" icon="close" @click="closeApp" />
      </q-bar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);
    function minimize() {
      if (process.env.MODE === "electron") {
        window.myWindowAPI.minimize();
      }
    }

    function toggleMaximize() {
      if (process.env.MODE === "electron") {
        window.myWindowAPI.toggleMaximize();
      }
    }

    function closeApp() {
      if (process.env.MODE === "electron") {
        window.myWindowAPI.close();
      }
    }
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      minimize,
      toggleMaximize,
      closeApp,
    };
  },
});
</script>
