<template>
  <v-card @click="$emit('click', item.id)" class="mx-auto my-6">
    <v-img height="200" :src="item.image"></v-img>

    <v-card-title>{{ item.names[0].value }}</v-card-title>
    <v-card-text>
      <v-col cols="12">
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
      </v-col>
      <v-col cols="12">
        <v-chip color="info" outlined class="ma-2" label>
          <v-icon class="mr-2">mdi-cake-variant</v-icon>
          {{ item.minage }}
        </v-chip>
        <v-chip color="info" outlined class="ma-2" label>
          <v-icon class="mr-2">mdi-account-multiple</v-icon>
          {{ item.minplayers }} -
          {{ item.maxplayers }}
        </v-chip>
        <v-chip color="info" outlined class="ma-2" label>
          <v-icon class="mr-2">mdi-clock-time-three</v-icon>
          {{ item.minplaytime }}-{{ item.maxplaytime }} min
        </v-chip>
      </v-col>
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
