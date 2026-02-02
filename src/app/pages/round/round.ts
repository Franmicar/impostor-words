import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { GameConfig } from '../../core/services/game-config';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from '../../shared/components/button/button';
import { Router } from '@angular/router';

type Phase = 'countdown' | 'playing';

@Component({
  selector: 'app-round',
  imports: [TranslateModule, Button],
  templateUrl: './round.html',
  styleUrl: './round.scss',
  standalone: true
})
export class Round implements OnInit, OnDestroy {

  countdown = signal(3);
  timeLeft = signal(0);
  phase = signal<'countdown' | 'playing'>('countdown');
  hasTimer = signal(false);

  private sub?: Subscription;

  constructor(private configService: GameConfig, private router: Router) { }

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  // -----------------------
  // CUENTA ATRÁS INICIAL
  // -----------------------
  startCountdown() {
    this.sub = interval(1000).subscribe(() => {
      this.countdown.update(v => v - 1);

      if (this.countdown() === 0) {
        this.sub?.unsubscribe();
        this.startRound();
      }
    });
  }

  // -----------------------
  // INICIO DE LA RONDA
  // -----------------------
  startRound() {
    const duration = this.configService.config.duration;

    this.phase.set('playing');

    if (duration && duration > 0) {
      this.hasTimer.set(true);
      this.timeLeft.set(duration * 60);
      this.startTimer();
    }
  }

  // -----------------------
  // TEMPORIZADOR DE JUEGO
  // -----------------------
  startTimer() {
    this.sub = interval(1000).subscribe(() => {
      this.timeLeft.update(v => v - 1);

      if (this.timeLeft() === 0) {
        this.sub?.unsubscribe();
        navigator.vibrate?.(100);
      }
    });
  }

  // -----------------------
  // IR A VOTACIÓN
  // -----------------------
  goToVoting() {
    // navegación a pantalla de elegir jugadores
    this.router.navigate(['/vote']);
  }
}
