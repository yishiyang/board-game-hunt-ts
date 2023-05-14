import {
  Action,
  Module,
  Mutation,
  VuexModule,
  getModule,
} from "vuex-module-decorators";

import axios from "axios";
import {
  parseBggXmlApi2ThingResponse,
  BggGame,
} from "@code-bucket/board-game-geek";

import store from "@/store";
import { parseString } from "xml2js";
import { IHotGame } from "@/types/game";

@Module({ dynamic: true, store, name: "games" })
class Games extends VuexModule {
  gameItems: Array<BggGame> = [];
  hotGameIDs: Array<number> = [];
  searchTerm: string = "";

  @Mutation
  private SET_GAMES(games: BggGame[]) {
    this.gameItems = games;
  }

  @Mutation
  private SET_HOT_GAMES(games: number[]) {
    this.hotGameIDs = games;
  }

  @Mutation
  private APPEND_GAME(game: BggGame) {
    this.gameItems.push(game);
  }

  @Mutation
  private UPDATE_SEARCH_TERM(searchTerm: string) {
    this.searchTerm = searchTerm;
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
    console.log(bggResponse);
    this.SET_GAMES(bggResponse?.items as BggGame[]);
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

    this.SET_HOT_GAMES(hotGames);
  }

  @Action
  searchGame(searchTerm: string) {
    this.UPDATE_SEARCH_TERM(searchTerm);
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
