import { UserService } from '../user.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RegisterGuard implements CanActivate {
  constructor(private router: Router,
              private afAuth: AngularFireAuth,
              private userService: UserService
            ) {
  }

  public canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.afAuth.user.subscribe((user) => {
        if (!user) {
          this.router.navigate(['/login']);
          return resolve(false);
        } else {
          this.userService.setUser(user).then((exist) => {
            if (!exist) {
              this.router.navigate(['/username']);
              return resolve(false);
            }
            return resolve(true);
          });
        }
      });
    });
  }
}
