import { Component } from '@angular/core';
import { GameStateService } from '../../core/services/game-state';
import { Router } from '@angular/router';
import { Player } from '../../core/models/player.model';
import { Button } from '../../shared/components/button/button';
import { GenericModal, GenericModalData } from '../../shared/modals/generic-modal/generic-modal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-kill-result',
  imports: [Button],
  templateUrl: './kill-result.html',
  styleUrl: './kill-result.scss',
  standalone: true
})
export class KillResult {

  killedPlayer!: Player;
  winners: string[] = [];
  showContinue = false;
  showWinners = false;

  constructor(
    private gameState: GameStateService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const killed =
      this.gameState.game.players.find(
        p => p.position === this.gameState.game.lastKilledPosition
      )!;

    this.killedPlayer = {
      position: killed.position,
      name: killed.name,
      role: killed.role,
    };

    // Recalcular estado de partida
    this.checkGameResult();
  }

  private checkGameResult() {
    const players = this.gameState.game.players;

    const impostorsAlive = players.filter(
      p => p.role === 'impostor' && !p.isDead
    );

    const civiliansAlive = players.filter(
      p => p.role === 'civilian' && !p.isDead
    );

    // CASO 1 — FIN DE JUEGO: civiles ganan (impostores muertos)
    if (impostorsAlive.length === 0) {
      this.showWinners = true;
      this.winners = civiliansAlive.map(p => p.name);
      return;
    }

    // CASO 2 — FIN DE JUEGO: impostores ganan
    if (impostorsAlive.length >= civiliansAlive.length) {
      this.showWinners = true;
      this.winners = impostorsAlive.map(p => p.name);
      return;
    }

    // CASO 3 — EL JUEGO SIGUE
    this.showContinue = true;
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

  continueGame() {
    this.gameState.allowNavigationOnce();
    this.router.navigate(['/round']);
  }

  goToMenu() {
    this.gameState.reset();
    this.gameState.allowNavigationOnce();
    this.router.navigate(['/home']);
  }
}
