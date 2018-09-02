import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: [
    './login.component.scss'
  ]
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public badpassword: boolean;

  constructor(public afAuth: AngularFireAuth, private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.badpassword = false;
      this.afAuth.auth.signInWithEmailAndPassword(
        this.loginForm.get('email').value,
        this.loginForm.get('password').value
      ).catch((error) => {
        if (error.code === 'auth/user-not-found') {
          this.afAuth.auth.createUserWithEmailAndPassword(
            this.loginForm.get('email').value,
            this.loginForm.get('password').value
          ).then(() => {
            this.router.navigate(['/username']);
          });
        } else {
          this.badpassword = true;
        }
      }).then(() => {
        this.router.navigate(['/']);
      });
    }
  }

}
