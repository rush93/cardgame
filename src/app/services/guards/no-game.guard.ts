import { UserService } from './../user.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class NoGameGuard implements CanActivate {
  constructor(private router: Router,
              private userService: UserService
            ) {
  }

  public canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.userService.player && this.userService.player.currentGame) {
        resolve(false);
        this.router.navigateByUrl('/game');
        return;
      }
      resolve(true);
    });
  }
}
