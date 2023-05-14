<template>
  <v-card
    height="400"
    color="#C6CADC"
    @click="$emit('click', item.id)"
    class="mx-auto my-6 pb-0"
  >
    <v-img height="200" :src="item.image"></v-img>
    <v-card-title class="text-h5">{{ item.names[0].value }}</v-card-title>

    <v-card-text class="px-4 brown--text">
      <div class="d-flex justify-start">
        <div class="text-body-1 mr-2">
          <v-icon class="" color="brown">mdi-cake-variant</v-icon>
          >
          {{ item.minage }} |
        </div>

        <div class="text-body-1 mr-2">
          <v-icon class="" color="brown">mdi-account-multiple</v-icon>
          >
          {{ item.minplayers }}-{{ item.maxplayers }} |
        </div>

        <div class="text-body-1">
          <v-icon color="brown">mdi-clock-time-three</v-icon>
          >
          {{ item.minplaytime }}-{{ item.maxplaytime }} min
        </div>
      </div>
      <div class="mt-4">
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
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
export default class GameCard extends Vue {}
</script>

<style></style>
