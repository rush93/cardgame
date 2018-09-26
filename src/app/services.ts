import { NoGameGuard } from './services/guards/no-game.guard';
import { GameGuard } from './services/guards/game.guard';
import { GameService } from './services/game.service';
import { NoAuthGuard } from './services/guards/no-auth.guard';
import { RegisterGuard } from './services/guards/register.guard';
import { NoUsernameGuard } from './services/guards/no-username.guard';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './services/user.service';
import { ToasterService } from './services/toaster.service';

export const SERVICES = [
  UserService,
  AngularFireDatabase,
  NoAuthGuard,
  NoUsernameGuard,
  RegisterGuard,
  GameService,
  GameGuard,
  ToasterService,
  NoGameGuard,
];
