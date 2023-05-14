import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule,
} from "vuex-module-decorators";
import { Vue } from "vue-property-decorator";
import axios from "axios";
import {
  parseBggXmlApi2ThingResponse,
  BggGame,
} from "@code-bucket/board-game-geek";

import store from "@/store";
import { parseString } from "xml2js";
import { IBggGame } from "@/types/game";

@Module({ dynamic: true, store, name: "games" })
class Games extends VuexModule {
  gameItems: Array<IBggGame> = [];
  hotGameIDs: Array<number> = [];
  searchTerm: string = "";

  @Mutation
  private SET_GAMES(games: IBggGame[]) {
    this.gameItems = games;
  }

  @Mutation
  private SET_HOT_GAME_IDs(games: number[]) {
    this.hotGameIDs = games;
  }

  @Mutation
  private APPEND_GAME(game: IBggGame) {
    this.gameItems.push(game);
  }

  @Mutation
  private UPDATE_SEARCH_TERM(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  @Mutation
  private VOTE_GAME(id: string) {
    var findIndex = 0;
    var find = this.gameItems.find((item, index) => {
      findIndex = index;
      return item.id.toString() == id;
    });
    if (find) {
      find.votes++;
    }

    //keep data's reactivity
    Vue.set(this.gameItems, findIndex, find);
  }

  @Action
  async loadHotGames() {
    var route = "https://api.geekdo.com/xmlapi2/thing?id=";
    for (var i = 0; i < 40; i++) {
      route = route + this.hotGameIDs[i] + ",";
    }
    route += "&stats=1&versions=1";
    console.log(route);
    const response = await axios.get(route);

    const bggResponse = parseBggXmlApi2ThingResponse(response.data);

    var updatedGames = bggResponse?.items.map((el) => {
      return { ...el, votes: Math.floor(Math.random() * (100 - 0 + 1) + 0) };
    });

    this.SET_GAMES(updatedGames as IBggGame[]);
  }

  @Action
  async loadHotGameIds() {
    const response = await axios.get(
      "https://api.geekdo.com/xmlapi2/hot?type=boardgame"
    );
    var hotGames = [] as Array<number>;
    parseString(response.data, function (err, result) {
      result.items.item.forEach((element: any) => {
        hotGames.push(element.$.id);
      });
    });

    this.SET_HOT_GAME_IDs(hotGames);
  }

  @Action
  searchGame(searchTerm: string) {
    this.UPDATE_SEARCH_TERM(searchTerm);
  }

  @Action
  voteGame(id: string) {
    this.VOTE_GAME(id);
  }

  get getGameById() {
    return function (id: string) {
      var find = getModule(Games).gameItems.find((item) => {
        return item.id.toString() == id;
      });

      return find ? find : undefined;
    };
  }

  get filteredGames() {
    return this.gameItems.filter((item: BggGame) => {
      return item.names[0].value
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());
    });
  }
}

export default getModule(Games);
