<template>
  <v-row>
    <v-col cols="12" v-for="item in loadedGames" :key="item.id">
      <router-link :to="{ path: '/gameDetail/' + item.id, props: true }">
        <GameCard :item="item" />
      </router-link>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import games from "@/store/modules/games";
import GameCard from "./GameCard.vue";
import GameDetail from "../views/GameDetail.vue";
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
export default class GameSection extends Vue {
  openDetail(id: string) {
    router.push({ path: "/gameDetail/", params: { id: id } });
  }
}
</script>

<style></style>
