import { Game } from './game';

export class Player {
  constructor(
    public pseudo: String,
    public nbGamesWin: number = 0,
    public nbGamesLose: number = 0,
    public currentGame: string = null,
  ) {}
}
