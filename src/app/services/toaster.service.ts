import { Injectable } from '@angular/core';
import * as Noty from 'noty';

@Injectable()
export class ToasterService {

  public error(message: string) {
    this.sendNotification(message, 'error');
  }

  public warning(message: string) {
    this.sendNotification(message, 'warning');
  }

  public sucess(message: string) {
    this.sendNotification(message, 'success');
  }

  private sendNotification(message, type) {
    new Noty({
      text: message,
      type,
      progressBar: true,
      theme: 'nest',
      timeout: 2000,
    }).show();
  }

}
