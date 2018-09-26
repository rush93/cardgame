import { GameService } from '../game.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class GameGuard implements CanActivate {
  constructor(private router: Router,
              private gameService: GameService
            ) {
  }

  public canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.gameService.getCurrentGame().then((game) => {
        resolve(true);
      }).catch(() => {
        this.router.navigate(['']);
        resolve(false);
      });
    });
  }
}
