import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: [ 'modal.component.scss' ]
})
export class ModalComponent {

  public open: Boolean = false;

  public openModal() {
    this.open = true;
  }
  public closeModal() {
    this.open = false;
  }
}
