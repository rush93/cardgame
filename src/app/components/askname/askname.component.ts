import { Router } from '@angular/router';
import { Player } from './../../models/player';
import { UserService } from './../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { regexValidator } from '../../validators/regexValidator';

@Component({
  selector: 'app-askname',
  templateUrl: 'askname.component.html'
})
export class AskNameComponent implements OnInit {
  public usernameForm: FormGroup;

  constructor(
    private userService: UserService,
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit() {
    this.usernameForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, regexValidator()])
    });
  }

  submit() {
    if (this.usernameForm.valid) {
      this.db.list(`players`).set(this.userService.uid, new Player(this.usernameForm.get('username').value)).then(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
