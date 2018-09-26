import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Game } from './../models/game';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

export const ALLREADY_IN_GAME = 'allready in game';

@Injectable()
export class GameService {

  public currentGame: Observable<Game>;
  public gameRef: AngularFireObject<any>;

  public constructor(
    public userService: UserService,
    private db: AngularFireDatabase,
  ) { }

  public createGame(name: string): Promise<void> {
    return new Promise((resolve) => {
      const gamePlayer = {};
      gamePlayer[this.userService.uid] = {
        leader: true
      };
      const game = new Game(name, gamePlayer);
      this.db.list('/games').push(game).then((createdGame) => {
        this.userService.setGame(createdGame.getKey()).then(() => {
          resolve();
        });
      });
    });
  }

  public getCurrentGame(): Promise<Observable<Game>> {
    return new Promise((resolve, reject) => {
      if (this.currentGame) {
        resolve(this.currentGame);
        return;
      }
      if (!this.userService.player || !this.userService.player.currentGame) {
        reject();
        return;
      }
      this.gameRef = this.db.object(`/games/${this.userService.player.currentGame}`);
      this.currentGame = this.gameRef.valueChanges();
      resolve(this.currentGame);
    });
  }

  public joinGame(gameKey: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.userService.player && this.userService.player.currentGame && this.userService.player.currentGame !== gameKey) {
        reject(ALLREADY_IN_GAME);
        return;
      }
      this.userService.setGame(gameKey).then(() => {
      const updatedPlayer = {};
        updatedPlayer[this.userService.uid] = {
          leader: false
        };
        this.db.object(`/games/${this.userService.player.currentGame}/players`).update(updatedPlayer).then(() => {
          resolve();
        });
      });
    });
  }

  private removeAll() {
    this.currentGame = null;
    this.gameRef = null;
  }

  public leaveGame(): Promise<void> {
    this.removeAll();
    return this.removePlayer(this.userService.uid);
  }

  public removePlayer(PlayerUid): Promise<void> {
    this.db.object(`/players/${PlayerUid}/currentGame`).remove();
    return this.db.object(`/games/${this.userService.player.currentGame}/players/${PlayerUid}`).remove();
  }

  public removeGame(): Promise<void> {
    const toReturn = this.gameRef.remove();
    this.removeAll();
    return toReturn;
  }
}
