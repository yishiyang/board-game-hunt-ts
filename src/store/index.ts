import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { parseBggXmlApi2ThingResponse } from "@code-bucket/board-game-geek";
Vue.use(Vuex);

interface IGame {
  name: string;
}

export default new Vuex.Store({
  state: {
    games: [] as IGame[],
  },
  getters: {},
  mutations: {
    SET_GAMES(state, games) {
      state.games = games;
    },
  },
  actions: {
    async loadGames() {
      const response = await axios.get(
        "https://api.geekdo.com/xmlapi2/thing?id=170416&versions=1"
      );

      const bggResponse = parseBggXmlApi2ThingResponse(response.data);
      var games: IGame[] = [];

      bggResponse?.items.forEach((element) => {
        games.push({ name: element.names[0].value });
      });

      console.log(games);

      this.commit("SET_GAMES", games);
    },
  },
  modules: {},
});
