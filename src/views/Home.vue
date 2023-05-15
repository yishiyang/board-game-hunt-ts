<template>
  <v-row class="justify-center">
    <v-col cols="10" class="pa-3">
      <v-row class="pa-5">
        <v-col md="6" lg="4" xl="3" v-for="item in loadedGames" :key="item.id">
          <GameCard :item="item" @click="openDetail($event)" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import games from "@/store/modules/games";
import GameCard from "../components/GameCard.vue";
import GameDetail from "./GameDetail.vue";
import router from "@/router/index";

@Component({
  components: {
    GameCard,
    GameDetail,
  },

  async mounted() {
    //when no game loaded, load games
    if (games.gameItems.length == 0) {
      await games.loadHotGameIds();
      await games.loadHotGames();
    }
  },
  computed: {
    loadedGames() {
      return games.filteredGames;
    },
  },
})
export default class Home extends Vue {
  searchTerm = "";

  openDetail(id: string) {
    router.push({ path: `/gameDetail/${id}` });
  }
}
</script>

<style></style>
