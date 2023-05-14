<template>
  <v-row class="mt-6 justify-center">
    <v-col xl="6" lg="8" md="10" xs="12">
      <router-link :to="{ path: '/' }">
        <v-btn class="mb-5 primary--text" color="accent">Back</v-btn>
      </router-link>
      <v-sheet rounded color="surface" elevation="6" class="mx-auto pa-5">
        <v-row>
          <v-col cols="6">
            <v-img cover max-height="400" :src="gameImage"></v-img>
          </v-col>

          <v-col cols="6">
            <div class="d-flex justify-space-between">
              <div class="text-h4 mb-3">{{ gameName }}</div>
              <v-btn color="#353B69" small @click="voteGame()">
                <v-icon left dark color="#F4D147"> mdi-emoticon </v-icon>
                <div class="yellow--text text-body-2">{{ gameVotes }}</div>
              </v-btn>
            </div>
            <div class="d-flex justify-start mb-2 brown--text">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on" class="text-body-1 mr-2">
                    <v-icon color="brown" size="20">mdi-cake-variant</v-icon>
                    >
                    {{ gameMinAge }} |
                  </div>
                </template>
                <span>Minimum play age</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <div v-bind="attrs" v-on="on" class="text-body-1 mr-2">
                    <v-icon class="" color="brown">mdi-account-multiple</v-icon>

                    {{ gameMinPlayers }}-{{ gameMaxPlayers }} |
                  </div>
                </template>
                <span>Number of players</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <div class="text-body-1" v-bind="attrs" v-on="on">
                    <v-icon color="brown">mdi-clock-time-three</v-icon>

                    {{ gameMinPlayTime }}-{{ gameMaxPlayTime }} min
                  </div>
                </template>
                <span>Play time</span>
              </v-tooltip>
            </div>
            <div class="mb-3" v-if="gameHasLinks">
              <v-chip
                v-for="(category, index) in gameCategories"
                :key="index + category.id"
                color="brown"
                outlined
                label
                class="mr-2 my-1"
              >
                {{ category.value }}
              </v-chip>
            </div>
            <div style="max-height: 220px" class="text-body-1 overflow-auto">
              {{ gameDescription }}
            </div>
          </v-col>
        </v-row>
      </v-sheet>

      <v-sheet rounded color="surface" elevation="6" class="mx-auto pa-5 mt-8">
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="6">
                <div class="text-body-1 mb-2">
                  User Suggested Number of Players
                </div>
                <v-chip label color="primary"> {{ randomPalyerNum }}</v-chip>
              </v-col>

              <v-col cols="6">
                <div class="text-body-1">
                  What's your recommendation?
                  <v-chip-group active-class="primary--text" column>
                    <v-chip filter v-for="n in gameMaxPlayers" :key="n">
                      {{ n }}
                    </v-chip>
                  </v-chip-group>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <div class="text-body-1 mb-6">User Suggested Play Time</div>
                <v-chip label color="primary"> {{ randomPalyTime }} min</v-chip>
              </v-col>
              <v-col cols="6">
                <div class="text-body-1">
                  What's your recommendation?

                  <div class="d-flex justify-center mt-10">
                    {{ gameMinPlayTime }} min
                    <v-slider
                      :min="gameMinPlayTime"
                      :max="gameMaxPlayTime"
                      v-model="selPlayTime"
                      thumb-label="always"
                    ></v-slider>
                    {{ gameMaxPlayTime }} min
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
import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import games from "@/store/modules/games";
import { BggGame, BggPoll } from "@code-bucket/board-game-geek";

@Component({
  props: {},

  computed: {},

  async mounted() {
    //reload games if this page is refreshed
    if (games.gameItems.length == 0) {
      await games.loadHotGameIds();
      await games.loadHotGames();
    }

    this.$data.gameId = this.$route.params.id;
  },
})
export default class GameDetail extends Vue {
  selPlayTime = this.randomPalyerNum;
  gameId = "";

  voteGame() {
    games.voteGame(this.gameId);
  }

  get game() {
    return games.getGameById(this.gameId);
  }

  get gameImage() {
    return this.game?.image;
  }

  get gameName() {
    return this.game?.names[0]?.value;
  }

  get gameMinAge() {
    return this.game?.minage;
  }

  get gameMinPlayers() {
    return this.game?.minplayers;
  }

  get gameMaxPlayers() {
    return this.game?.maxplayers;
  }

  get gameMinPlayTime() {
    return this.game?.minplaytime;
  }

  get gameMaxPlayTime() {
    return this.game?.maxplaytime;
  }

  get gameHasLinks() {
    return this.game?.links.length;
  }

  get gameDescription() {
    return this.game?.description;
  }

  get gameVotes() {
    return this.game?.votes;
  }

  get gameCategories() {
    var links = [];
    for (var i = 0; i < 3; i++) {
      links.push(this.game?.links[i]);
    }
    return links ? links : [];
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
