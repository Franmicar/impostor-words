import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { GameConfig } from '../../core/services/game-config';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from '../../shared/components/button/button';
import { Router } from '@angular/router';
import { GameStateService } from '../../core/services/game-state';
import { PreventExit } from '../../core/services/prevent-exit-guard';
import { GenericModal, GenericModalData } from '../../shared/modals/generic-modal/generic-modal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-round',
  imports: [TranslateModule, Button],
  templateUrl: './round.html',
  styleUrl: './round.scss',
  standalone: true
})
export class Round implements OnInit, OnDestroy, PreventExit {

  countdown = signal(3);
  timeLeft = signal(0);
  phase = signal<'countdown' | 'playing'>('countdown');
  hasTimer = signal(false);

  private sub?: Subscription;

  constructor(private configService: GameConfig, private router: Router, private gameState: GameStateService,
    private dialog: MatDialog) { }

  ngOnInit() {
    // Si venimos de una ronda en curso, restauramos el tiempo
    if (this.gameState.game.time && this.gameState.game.time > 0) {
      this.timeLeft.set(this.gameState.game.time);
      this.startRound();
    } else {
      this.startCountdown();
    }
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

    // 🔥 CLAVE: si ya hay tiempo guardado, NO lo sobreescribimos
    const savedTime = this.gameState.game.time;

    if (duration && duration > 0) {
      this.hasTimer.set(true);

      // Si hay tiempo guardado, lo usamos; si no, usamos el de configuración
      if (!savedTime || savedTime <= 0) {
        this.timeLeft.set(duration * 60);
      }

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
    this.gameState.update({
      state: 'voting',
      time: this.timeLeft()
    });
    this.gameState.allowNavigationOnce();
    this.router.navigate(['/vote']);
  }

  confirmExit(): Promise<boolean> | boolean {
    if (this.gameState.allowExit) {
      return true;
    }

    const data: GenericModalData = {
      title: 'exitModal.title',
      message: 'exitModal.message',
      acceptText: 'exitModal.acceptText'
    };

    const ref = this.dialog.open(GenericModal, {
      data,
      disableClose: true,   // no se puede cerrar haciendo click fuera
      width: '320px'
    });

    return ref.afterClosed().toPromise();
  }
}
