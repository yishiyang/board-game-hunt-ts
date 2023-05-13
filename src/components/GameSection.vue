<template>
  <v-row>
    <v-col cols="12" v-for="item in loadedGames" :key="item.id">
      <GameCard :item="item" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import games from "@/store/modules/games";
import GameCard from "./GameCard.vue";

@Component({
  components: {
    GameCard,
  },

  async mounted() {
    await games.loadHotGameIds();
    await games.loadHotGames();
  },
  computed: {
    loadedGames() {
      return games.gameItems;
    },
  },
})
export default class GameSection extends Vue {
  window = 0;
  length = 3;
}
</script>

<style></style>
