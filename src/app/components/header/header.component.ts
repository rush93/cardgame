import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html'
})
export class HeaderComponent {
  constructor(
    public userService: UserService
  ) {
  }
  logout() {
    this.userService.logout();
  }
}
