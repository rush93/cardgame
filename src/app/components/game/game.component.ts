import { Router } from '@angular/router';
import { ToasterService } from './../../services/toaster.service';
import { Player } from './../../models/player';
import { Game } from './../../models/game';
import { GameService } from './../../services/game.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { untilDestroyed, TakeUntilDestroy } from 'ngx-take-until-destroy';

@TakeUntilDestroy()
@Component({
  selector: 'app-game',
  templateUrl: 'game.component.html',
  styleUrls: [ './game.component.scss' ]
})
export class GameComponent implements OnInit {
  public game: Game;
  public players: any;
  public owner: Player;

  private leave: Boolean = false;

  public constructor (
    public gameService: GameService,
    public userService: UserService,
    public toaster: ToasterService,
    public router: Router
  ) { }

  public ngOnInit() {
    setTimeout(() => {
      this.gameService.getCurrentGame().then((gameObservable: Observable<Game>) => {
        gameObservable.pipe(untilDestroyed(this)).subscribe((game: Game) => {
          if (!game && !this.leave) {
            this.gameService.leaveGame().then(() => {
              this.toaster.warning('La partie à été supprimé.');
              this.router.navigateByUrl('/');
            });
            return;
          }
          if (this.leave) {
            return;
          }
          this.game = game;
          this.players = {};
          for (const playerKey in this.game.players) {
            if (!this.game.players[playerKey]) { continue; }
            this.userService.getPlayer(playerKey).pipe(untilDestroyed(this)).subscribe((player) => {
              if (!this.players) {
                this.players = {};
              }
              this.players[playerKey] = player;
            });
          }
        });
      });
      this.owner = this.userService.player;
      this.userService.playerObserver.subscribe((player) => {
        this.owner = player;
      });
    });
  }

  public leaveRedirect() {
    this.userService.setGame(null).then(() => {
      this.toaster.sucess('Vous avez quitté la partie.');
      this.router.navigateByUrl('/');
    });
  }

  public leaveGame() {
    this.leave = true;
    if (this.game.players[this.userService.uid].leader) {
      this.gameService.removeGame().then(() => {
        this.leaveRedirect();
      });
      return;
    }

    if (Object.keys(this.game.players).length <= 1) {
      this.gameService.removeGame().then(() => {
        this.leaveRedirect();
      });
    }
    this.gameService.leaveGame().then(() => {
      this.leaveRedirect();
    });
  }

  public startGame() {
    this.toaster.warning('ATTEND ! c\'est pas encore codé.');
  }
}
