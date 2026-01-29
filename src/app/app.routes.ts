import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Setup } from './pages/setup/setup';
import { Assign } from './pages/assign/assign';
import { Round } from './pages/round/round';
import { Reveal } from './pages/reveal/reveal';


export const routes: Routes = [
  { path: '', component: Home },
  { path: 'setup', component: Setup },
  { path: 'assign', component: Assign },
  { path: 'round', component: Round },
  { path: 'reveal', component: Reveal },
  { path: '**', redirectTo: '' }
];
