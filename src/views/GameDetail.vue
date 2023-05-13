<template>
  <v-row>
    <router-link :to="{ path: '/' }">
      <v-btn>Back</v-btn>
    </router-link>

    <v-card>
      <v-img height="250" :src="game.image"></v-img>
      <v-card-title>{{ game.names[0].value }}</v-card-title>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import games from "@/store/modules/games";
@Component({
  props: {},

  watch: {
    $route(to, from) {
      // react to route changes...
      console.log(to);
      console.log(from);
    },
  },

  computed: {
    game() {
      const gameId = this.$route.params.id;
      console.log(games.getGameById(gameId));
      return games.getGameById(gameId);
    },
  },
})
export default class GameDetail extends Vue {}
</script>

<style></style>
