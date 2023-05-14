<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-row class="justify-center">
        <v-col cols="10">
          <v-row>
            <v-col cols="6">
              <router-link
                to="/"
                class="white--text"
                style="text-decoration: none"
              >
                <div class="d-flex align-center">
                  <v-img
                    class="shrink mr-2"
                    contain
                    src="./assets/logo.png"
                    transition="scale-transition"
                    width="40"
                  />

                  <h1 class="text-h4">Board Game Hunt</h1>
                </div>
              </router-link>
            </v-col>
            <v-spacer />
            <v-col cols="4">
              <div>
                <v-text-field
                  v-model="searchTerm"
                  class="d-flex justify-self-end"
                  filled
                  solo
                  dense
                  label="Search to find games"
                  prepend-inner-icon="mdi-magnify"
                  rounded
                  hide-details
                  clearable
                  @input="searchGame($event)"
                ></v-text-field>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-main class="bkg">
      <v-row>
        <v-col cols="12"><router-view></router-view> </v-col>
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
export default class App extends Vue {
  searchTerm = "";

  searchGame(searchTerm: string) {
    if (searchTerm === null) {
      searchTerm = "";
    }
    games.searchGame(searchTerm);
  }
}
</script>

<style scoped>
.bkg {
  background-image: url("@/assets/background.svg");
  background-size: cover;
  background-position: center center;
}
</style>
