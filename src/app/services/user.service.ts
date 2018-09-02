import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Player } from '../models/player';
import { Subscription } from 'rxjs';

@Injectable()
export class UserService {
  public player: Player;
  public uid: string;

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
      this.subsribtion = this.db.object(`/players/${this.uid}`).valueChanges().subscribe((obj) => {
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
}
