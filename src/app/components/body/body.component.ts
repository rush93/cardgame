import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Game } from './../../models/game';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { regexValidator } from '../../validators/regexValidator';

@Component({
  selector: 'app-body',
  templateUrl: 'body.component.html',
  styleUrls: ['body.component.scss']
})
export class BodyComponent implements OnInit {

  @ViewChild('createGame') public createGameModal: ModalComponent;
  public createGameForm: FormGroup;
  private gamesRef: AngularFireList<any>;
  public games: Observable<any[]>;
  public search: String = '';

  public constructor(
    private db: AngularFireDatabase,
    private userService: UserService,
    private router: Router
  ) { }

  public ngOnInit() {
    this.createGameForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, regexValidator()])
    });
    this.gamesRef = this.db.list('/games');
    this.games = this.gamesRef.valueChanges();
  }

  public openCreateGameModal() {
    this.createGameModal.openModal();
  }
  public closeCreateGameModal() {
    this.createGameModal.closeModal();
  }

  public submitCreateGame() {
    if (this.createGameForm.valid) {
      const gamePlayer = {};
      gamePlayer[this.userService.uid] = {
        isLeader: true,
        isReady: false
      };
      const game = new Game(this.createGameForm.get('name').value, gamePlayer);
      this.gamesRef.push(game).then(() => {
        this.closeCreateGameModal();
        // this.router.navigate(['/game']);
      });
    }
  }
}
