import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class NoAuthGuard implements CanActivate {
  constructor(private router: Router,
              private afAuth: AngularFireAuth) {
  }

  public canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.user.subscribe((user) => {
        if (!user) {
          return resolve(true);
        } else {
          this.router.navigate(['/username']);
          return resolve(false);
        }
      });
    });
  }
}
