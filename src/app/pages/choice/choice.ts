import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GameConfig } from '../../core/services/game-config';
import { Router } from '@angular/router';
import { GameStateService } from '../../core/services/game-state';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from '../../shared/components/button/button';
import { MatDialog } from '@angular/material/dialog';
import { GenericModal, GenericModalData } from '../../shared/modals/generic-modal/generic-modal';

@Component({
  selector: 'app-choice',
  imports: [TranslateModule, Button],
  templateUrl: './choice.html',
  styleUrl: './choice.scss',
  standalone: true,
})
export class Choice implements OnInit {

  constructor(private configService: GameConfig, private router: Router, private gameState: GameStateService,
    private dialog: MatDialog
  ) { }

  names: string[] = [];
  rouletteNames: string[] = [];
  spinning = true;
  spinFinished = false;
  transform = 'translateY(0px)';

  @ViewChild('rouletteEl') rouletteEl!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    this.names = this.configService.config.players.map(p => p.name);
    this.prepareRoulette();
    this.startSpin();
  }

  prepareRoulette() {
    // Repetimos varias veces para dar sensación de giro
    this.rouletteNames = Array(5).fill(this.names).flat();
  }

  startSpin() {
    const itemHeight = 60;
    const winnerIndex = Math.floor(Math.random() * this.names.length);
    const loops = 3 * this.names.length;
    const finalIndex = loops + winnerIndex;
    const offset = finalIndex * itemHeight;

    this.transform = `translateY(-${offset}px)`;
  }

  onSpinEnd() {
    if (this.spinFinished) return;
    this.spinFinished = true;
    this.spinning = false;

    // navigator.vibrate?.(50);
  }

  startGame() {
    this.gameState.update({
      state: 'playing'
    });
    this.gameState.allowNavigationOnce();
    this.router.navigate(['/round']);
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
