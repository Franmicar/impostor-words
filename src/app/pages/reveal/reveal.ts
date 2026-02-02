import { Component } from '@angular/core';
import { GameStateService } from '../../core/services/game-state';
import { GameConfig } from '../../core/services/game-config';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { Button } from '../../shared/components/button/button';

@Component({
  selector: 'app-reveal',
  imports: [TranslateModule, MatCardModule, MatButtonModule, DragDropModule, Button],
  templateUrl: './reveal.html',
  styleUrl: './reveal.scss',
  standalone: true
})
export class Reveal {

  revealed = false;

  constructor(
    public gameStateService: GameStateService,
    private configService: GameConfig,
    private router: Router
  ) { }

  get currentPlayerName() {
    return this.configService.config.players[this.gameStateService.currentPlayerIndex].name;
  }

  get isImpostor() {
    return this.gameStateService.isImpostor(this.gameStateService.currentPlayerIndex);
  }

  onDragEnd(event: CdkDragEnd) {
    // SIEMPRE vuelve a su sitio al soltar
    event.source.reset();
    this.revealed = true;
  }

  play() {
    this.revealed = false;
    this.router.navigate(['/choice']);
  }

  next() {
    this.revealed = false;
    this.gameStateService.nextPlayer();
  }

}
