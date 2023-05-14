<template>
  <v-card
    height="400"
    color="surface"
    @click="$emit('click', item.id)"
    class="mx-auto"
    elevation="6"
  >
    <v-img height="200" :src="item.image"></v-img>

    <v-card-title>
      <v-col cols="9" class="pa-0 ma-0">
        <div class="text-truncate text-h5">{{ item.names[0].value }}</div>
      </v-col>
      <v-col cols="3" class="pa-0 ma-0 d-flex justify-end">
        <v-btn color="#353B69" small @click.stop="vote()">
          <v-icon left dark color="#F4D147"> mdi-emoticon </v-icon>
          <div class="yellow--text text-body-2">{{ item.votes }}</div>
        </v-btn>
      </v-col>
    </v-card-title>

    <v-card-text class="px-4 brown--text">
      <div class="d-flex justify-start">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" class="text-body-1 mr-2">
              <v-icon color="brown" size="20">mdi-cake-variant</v-icon>
              >
              {{ item.minage }} |
            </div>
          </template>
          <span>Minimum play age</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on" class="text-body-1 mr-2">
              <v-icon class="" color="brown">mdi-account-multiple</v-icon>

              {{ item.minplayers }}-{{ item.maxplayers }} |
            </div>
          </template>
          <span>Number of players</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div class="text-body-1" v-bind="attrs" v-on="on">
              <v-icon color="brown">mdi-clock-time-three</v-icon>

              {{ item.minplaytime }}-{{ item.maxplaytime }} min
            </div>
          </template>
          <span>Play time</span>
        </v-tooltip>
      </div>
      <div class="mt-4">
        <v-chip
          v-for="(category, index) in gameCategories"
          :key="index + category.id + category.value"
          color="brown"
          outlined
          label
          small
          class="mr-2 my-1"
        >
          {{ category.value }}
        </v-chip>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import games from "@/store/modules/games";
@Component({
  props: {
    item: {
      type: Object as () => {
        id: number;
        name: string;
      },
      required: true,
    },
  },

  computed: {
    gameCategories() {
      var links = [];
      for (var i = 0; i < 3; i++) {
        links.push(this.$props.item.links[i]);
      }
      return links;
    },
  },
})
export default class GameCard extends Vue {
  vote() {
    console.log("vote");
    games.voteGame(this.$props.item.id);
  }
}
</script>

<style></style>
