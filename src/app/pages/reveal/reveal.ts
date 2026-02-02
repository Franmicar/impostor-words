import { Component } from '@angular/core';
import { GameStateService } from '../../core/services/game-state';
import { GameConfig } from '../../core/services/game-config';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { Button } from '../../shared/components/button/button';
import { TitleComponent } from '../../shared/components/title/title';
import { MatDialog } from '@angular/material/dialog';
import { GenericModal, GenericModalData } from '../../shared/modals/generic-modal/generic-modal';

@Component({
  selector: 'app-reveal',
  imports: [TranslateModule, MatCardModule, MatButtonModule, DragDropModule, Button, TitleComponent],
  templateUrl: './reveal.html',
  styleUrl: './reveal.scss',
  standalone: true
})
export class Reveal {

  revealed = false;

  constructor(
    public gameStateService: GameStateService,
    private configService: GameConfig,
    private router: Router,
    private dialog: MatDialog
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
    this.gameStateService.update({
      state: 'choosing'
    });
    this.gameStateService.allowNavigationOnce();
    this.router.navigate(['/choice']);
  }

  next() {
    this.revealed = false;
    this.gameStateService.nextPlayer();
  }

  confirmExit(): Promise<boolean> | boolean {
    if (this.gameStateService.allowExit) {
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
