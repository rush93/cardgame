import { RegisterGuard } from './services/register.guard';
import { NoUsernameGuard } from './services/no-username.guard';
import { AskNameComponent } from './components/askname/askname.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NoAuthGuard } from './services/no-auth.guard';

export const ROUTES: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'username', component: AskNameComponent, canActivate: [NoUsernameGuard]},
  {path: '', component: LayoutComponent, canActivate: [RegisterGuard]},
  {path: '**', redirectTo: ''}
];
