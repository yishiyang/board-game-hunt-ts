<template>
  <v-row class="mt-6 justify-center">
    <v-col cols="6">
      <router-link :to="{ path: '/' }">
        <v-btn class="mb-5" color="primary">Back</v-btn>
      </router-link>
      <v-sheet rounded color="surface" elevation="6" class="mx-auto pa-5">
        <v-row>
          <v-col cols="6">
            <v-img cover height="auto" :src="game.image"></v-img>
          </v-col>

          <v-col cols="6">
            <div class="text-h4 mb-3">{{ game.names[0].value }}</div>
            <div class="d-flex justify-start mb-2 brown--text">
              <div class="text-body-1 mr-2">
                <v-icon class="" color="brown">mdi-cake-variant</v-icon>
                >
                {{ game.minage }} |
              </div>

              <div class="text-body-1 mr-2">
                <v-icon class="" color="brown">mdi-account-multiple</v-icon>

                {{ game.minplayers }}-{{ game.maxplayers }} |
              </div>

              <div class="text-body-1">
                <v-icon color="brown">mdi-clock-time-three</v-icon>

                {{ game.minplaytime }}-{{ game.maxplaytime }} min
              </div>
            </div>
            <div class="mb-3">
              <v-chip
                v-for="(category, index) in gameCategories"
                :key="index + category.id"
                color="brown"
                outlined
                label
                small
                class="mr-2 my-1"
              >
                {{ category.value }}
              </v-chip>
            </div>
            <div style="max-height: 200px" class="text-body-1 overflow-auto">
              {{ game.description }}
            </div>
          </v-col>
        </v-row>
      </v-sheet>

      <v-sheet rounded color="surface" elevation="6" class="mx-auto pa-5 mt-8">
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="6">
                <div class="text-body-1">User Suggested Number of Players</div>
                <v-chip> {{ randomPalyerNum }}</v-chip>
              </v-col>

              <v-col cols="6">
                <div class="text-body-1">
                  What's your recommendation?
                  <v-chip-group active-class="primary--text" column>
                    <v-chip v-for="n in game.maxplayers" :key="n">
                      {{ n }}
                    </v-chip>
                  </v-chip-group>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <div class="text-body-1">User Suggested Play Time</div>
                <v-chip> {{ randomPalyTime }} min</v-chip>
              </v-col>
              <v-col cols="6">
                <div class="text-body-1">
                  What's your recommendation?

                  <div class="d-flex justify-center mt-10">
                    {{ game.minplaytime }} min
                    <v-slider
                      :min="game.minplaytime"
                      :max="game.maxplaytime"
                      v-model="selPlayTime"
                      thumb-label="always"
                    ></v-slider>
                    {{ game.maxplaytime }} min
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-sheet>
    </v-col>
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
  get polls() {
    return this.game?.polls[0].title;
  }

  get randomPalyerNum() {
    //I'm making a random number here between min-max palyer number,
    //due to the effort needed to parse the complicated obejct from poll results
    var min = this.game?.minplayers ? this.game?.minplayers : 0;
    var max = this.game?.maxplayers ? this.game?.maxplayers : 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  get randomPalyTime() {
    //I'm making a random number here between min-max palyer number,
    //due to the effort needed to parse the complicated obejct from poll results
    var min = this.game?.minplaytime ? this.game?.minplaytime : 0;
    var max = this.game?.maxplaytime ? this.game?.maxplaytime : 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
</script>

<style>
.bar-container {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
}

.bar {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.5s ease-in-out;
}
</style>
