import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../../node_modules/bootflat/css/bootstrap.min.css',
    './app.component.scss'
  ]
})
export class AppComponent {

  public spin = true;

  public activeSpinner() {
    this.spin = true;
  }

  public desactiveSpinner() {
    this.spin = false;
  }

}
