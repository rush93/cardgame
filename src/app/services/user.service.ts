import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Player } from '../models/player';
import { Subscription, Observable } from 'rxjs';
import { Game } from '../models/game';

@Injectable()
export class UserService {
  public player: Player;
  public playerRef: AngularFireObject<any>;
  public uid: string;
  public playerObserver: Observable<Player>;

  private subsribtion: Subscription;

  public constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  public setUser(user: firebase.User): Promise<Boolean> {

    return new Promise((resolve) => {
      if (!user) {
        this.uid = null;
        this.player = null;
        if (this.subsribtion) {
          this.subsribtion.unsubscribe();
        }
        return;
      }
      this.uid = user.uid;
      this.playerRef = this.db.object(`/players/${this.uid}`);
      this.playerObserver = this.playerRef.valueChanges();
      this.subsribtion = this.playerObserver.subscribe((obj) => {
        if (!obj) {
          resolve(false);
          return;
        }
        this.player = <Player>obj;
        resolve(true);
      });
    });
  }

  public logout() {
    this.uid = null;
    this.player = null;
    if (this.subsribtion) {
      this.subsribtion.unsubscribe();
    }
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  public setGame(currentGame: string): Promise<void> {
    return this.playerRef.update({ currentGame });
  }

  public getPlayer(playerKey: string): Observable<Player> {
    return <Observable<Player>>this.db.object(`/players/${playerKey}`).valueChanges();
  }
}
