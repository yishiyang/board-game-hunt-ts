<template>
  <v-card>
    <v-img height="250" :src="item.image"></v-img>
    <v-card-title>{{ item.names[0].value }}</v-card-title>
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
})
export default class GameDetail extends Vue {}
</script>

<style></style>
