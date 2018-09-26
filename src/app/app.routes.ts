import { NoGameGuard } from './services/guards/no-game.guard';
import { GameGuard } from './services/guards/game.guard';
import { GameComponent } from './components/game/game.component';
import { ListComponent } from './components/list/list.component';
import { RegisterGuard } from './services/guards/register.guard';
import { NoUsernameGuard } from './services/guards/no-username.guard';
import { AskNameComponent } from './components/askname/askname.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NoAuthGuard } from './services/guards/no-auth.guard';

export const ROUTES: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]},
  {path: 'username', component: AskNameComponent, canActivate: [NoUsernameGuard]},
  {path: '', component: LayoutComponent, canActivate: [RegisterGuard],
    children: [
      {path: 'game', component: GameComponent, canActivate: [GameGuard]},
      {path: '', component: ListComponent, canActivate: [NoGameGuard]},
    ]
  },
  {path: '**', redirectTo: ''}
];
