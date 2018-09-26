import { SERVICES } from './services';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule} from 'angularfire2/storage';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { COMPONENTS } from './components';
import { PIPES } from './pipes';

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    RouterModule .forRoot(ROUTES, {
      useHash: false
    })
  ],
  providers: [
    ...SERVICES
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
