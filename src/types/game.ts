import {
  BggLink,
  BggName,
  BggPoll,
  BggVersion,
} from "@code-bucket/board-game-geek";

export interface IBggGame {
  //added a new field 'votes' to the interface
  id: number;
  type: "boardgame" | string;
  thumbnail: string;
  image: string;
  links: BggLink[];
  names: BggName[];
  yearpublished?: number;
  description: string;
  minplayers: number;
  maxplayers: number;
  polls: BggPoll[];
  playingtime: number;
  minplaytime: number;
  maxplaytime: number;
  minage: number;
  versions: BggVersion[];
  get namesValues(): string[];
  get primaryName(): string | undefined;
  get categories(): BggLink[];
  get mechanics(): BggLink[];
  get families(): BggLink[];
  get expansions(): BggLink[];
  get implementations(): BggLink[];
  get designers(): BggLink[];
  get artists(): BggLink[];
  get publishers(): BggLink[];
  votes: number;
}
