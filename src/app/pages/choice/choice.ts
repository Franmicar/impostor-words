import { Component, OnInit } from '@angular/core';
import { GameConfig } from '../../core/services/game-config';
import { Router } from '@angular/router';
import { GameStateService } from '../../core/services/game-state';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-choice',
  imports: [TranslateModule, Button],
  templateUrl: './choice.html',
  styleUrl: './choice.scss',
  standalone: true,
})
export class Choice implements OnInit {

  constructor(private configService: GameConfig, private router: Router, private gameState: GameStateService) { }

  names: string[] = [];
  rouletteNames: string[] = [];
  spinning = true;
  spinFinished = false;
  transform = 'translateY(0px)';

  ngOnInit() {
    // this.names = this.configService.config.names;
    this.prepareRoulette();
    this.spin();
  }

  prepareRoulette() {
    // Repetimos varias veces para dar sensación de giro
    this.rouletteNames = Array(5).fill(this.names).flat();
  }

  spin() {
    const itemHeight = 60;

    const winnerIndex = Math.floor(Math.random() * this.names.length);
    const loops = 3 * this.names.length;
    const finalIndex = loops + winnerIndex;

    const offset = finalIndex * itemHeight;

    this.gameState.setStartingPlayer(this.names[winnerIndex]);

    // Forzamos frame inicial
    requestAnimationFrame(() => {
      this.transform = `translateY(-${offset}px)`;
    });
  }

  onSpinEnd() {
    if (this.spinFinished) return;

    this.spinFinished = true;
    this.spinning = false;

    // navigator.vibrate?.(50);
  }

  startGame() {
    this.router.navigate(['/round']);
  }


}
