<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-row>
        <v-col cols="8"><router-view></router-view> </v-col>
        <v-col cols="2"> </v-col>
      </v-row>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import GameSection from "./components/GameSection.vue";
import games from "@/store/modules/games";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    GameSection,
  },
})
export default class App extends Vue {}
</script>
