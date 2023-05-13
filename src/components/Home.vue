<template>
  <v-row>
    <v-col cols="12" v-for="item in loadedGames" :key="item.id">
      <GameCard :item="item" @click="openDetail($event)" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import games from "@/store/modules/games";
import GameCard from "./GameCard.vue";
import GameDetail from "./GameDetail.vue";
import router from "@/router/index";

@Component({
  components: {
    GameCard,
    GameDetail,
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
export default class Home extends Vue {
  openDetail(id: string) {
    router.push({ path: `/gameDetail/${id}` });
  }
}
</script>

<style></style>
