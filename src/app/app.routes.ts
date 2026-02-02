import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Setup } from './pages/setup/setup';
import { Round } from './pages/round/round';
import { Reveal } from './pages/reveal/reveal';
import { Mode } from './pages/mode/mode';
import { Players } from './pages/players/players';
import { Hints } from './pages/hints/hints';
import { Packages } from './pages/packages/packages';
import { Duration } from './pages/duration/duration';
import { Choice } from './pages/choice/choice';
import { Vote } from './pages/vote/vote';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'setup', component: Setup },
  { path: 'round', component: Round },
  { path: 'reveal', component: Reveal },
  { path: 'mode', component: Mode },
  { path: 'players', component: Players },
  { path: 'hints', component: Hints },
  { path: 'packages', component: Packages },
  { path: 'duration', component: Duration },
  { path: 'choice', component: Choice },
  { path: 'vote', component: Vote },
  { path: '**', redirectTo: '' }
];
