import { SearchPipe } from './pipes/search.pipe';
import { AskNameComponent } from './components/askname/askname.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UserService } from './services/user.service';
import { AngularFireStorageModule} from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { NoAuthGuard } from './services/no-auth.guard';
import { RegisterGuard } from './services/register.guard';
import { NoUsernameGuard } from './services/no-username.guard';
import { BodyComponent } from './components/body/body.component';
import { ModalComponent } from './components/modal/modal.component';
import { KeysPipe } from './pipes/keys.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    AskNameComponent,
    BodyComponent,
    ModalComponent,
    KeysPipe,
    SearchPipe
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
    UserService,
    AngularFireDatabase,
    NoAuthGuard,
    NoUsernameGuard,
    RegisterGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
