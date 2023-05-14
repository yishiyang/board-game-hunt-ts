import Vue from "vue";
import VueRouter from "vue-router";
import { RouteConfig } from "vue-router";

Vue.use(VueRouter);

import Home from "@/views/Home.vue";
import GameDetail from "@/views/GameDetail.vue";

const routes: RouteConfig[] = [
  { path: "/", component: Home },
  { path: "/gameDetail/:id", component: GameDetail, props: true },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
