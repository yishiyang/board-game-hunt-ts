<template>
  <v-row>
    <router-link :to="{ path: '/' }">
      <v-btn>Back</v-btn>
    </router-link>

    <v-img height="250" contain :src="game.image"></v-img>
    <v-card-title>{{ game.names[0].value }}</v-card-title>
    {{ game.description }}
    {{ game.yearpublished }}

    <v-chip color="info" outlined class="ma-2" label>
      <v-icon class="mr-2">mdi-cake-variant</v-icon>
      > {{ game.minage }}
    </v-chip>

    <v-chip color="info" outlined class="ma-2" label>
      <v-icon class="mr-2">mdi-account-multiple</v-icon>
      {{ game.minplayers }} -
      {{ game.maxplayers }}
    </v-chip>
    <v-chip color="info" outlined class="ma-2" label>
      <v-icon class="mr-2">mdi-clock-time-three</v-icon>
      {{ game.minplaytime }}-{{ game.maxplaytime }} min
    </v-chip>

    <v-chip
      v-for="(category, index) in gameCategories"
      :key="index + category.id"
      color="info"
      outlined
      class="ma-2"
      label
    >
      {{ category.value }}
    </v-chip>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import games from "@/store/modules/games";
import { BggGame, BggPoll } from "@code-bucket/board-game-geek";

@Component({
  props: {},

  watch: {
    $route(to, from) {
      // react to route changes...
      console.log(to);
      console.log(from);
    },
  },

  computed: {},
})
export default class GameDetail extends Vue {
  get game() {
    const gameId = this.$route.params.id;
    console.log(games.getGameById(gameId));
    return games.getGameById(gameId);
  }

  get gameCategories() {
    var links = [];
    for (var i = 0; i < 3; i++) {
      links.push(this.game?.links[i]);
    }
    return links;
  }
}
</script>

<style></style>
