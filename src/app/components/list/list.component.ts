import { GameService, ALLREADY_IN_GAME } from './../../services/game.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { regexValidator } from '../../validators/regexValidator';
import { ToasterService } from '../../services/toaster.service';
import { untilDestroyed, TakeUntilDestroy } from 'ngx-take-until-destroy';

@TakeUntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('createGame') public createGameModal: ModalComponent;
  public createGameForm: FormGroup;
  private gamesRef: AngularFireObject<any>;
  public games: Observable<any[]>;
  public search: String = '';
  public gamesObject: any;

  public constructor(
    private db: AngularFireDatabase,
    private userService: UserService,
    private router: Router,
    private gameService: GameService,
    private toaster: ToasterService,
  ) { }

  public ngOnInit() {
    this.createGameForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, regexValidator()])
    });
    this.gamesRef = this.db.object('/games');
    this.games = this.gamesRef.valueChanges();
    this.games.pipe(untilDestroyed(this)).subscribe((games) => {
      this.gamesObject = games;
    });
  }

  public openCreateGameModal() {
    this.createGameModal.openModal();
  }
  public closeCreateGameModal() {
    this.createGameModal.closeModal();
  }

  public submitCreateGame() {
    if (this.createGameForm.valid) {
      this.gameService.createGame(this.createGameForm.get('name').value).then(() => {
        this.closeCreateGameModal();
        this.router.navigateByUrl('/game');
      });
    }
  }

  public async joinGame(gameKeyIndex) {
    const gameKey = Object.keys(this.gamesObject)[gameKeyIndex];
    this.gameService.joinGame(gameKey).then(() => {
      this.router.navigateByUrl('/game');
    }).catch((error) => {
      if (error === ALLREADY_IN_GAME) {
        this.toaster.warning('Vous êtes déjà dans une partie!');
        return;
      }
    });
  }
}
