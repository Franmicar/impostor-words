import { Component, computed, OnInit, signal } from '@angular/core';
import { GameStateService } from '../../core/services/game-state';
import { Router } from '@angular/router';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Button } from '../../shared/components/button/button';
import { TitleComponent } from '../../shared/components/title/title';
import { GenericModal, GenericModalData } from '../../shared/modals/generic-modal/generic-modal';
import { Player } from '../../core/models/player.model';
import { GameDataService } from '../../core/services/game-data';
import { HintType } from '../../core/models/configuration.model';
import { LoadingService } from '../../core/services/loading';

@Component({
  selector: 'app-reveal',
  standalone: true,
  imports: [
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    DragDropModule,
    Button,
    TitleComponent
  ],
  templateUrl: './reveal.html',
  styleUrl: './reveal.scss',
})
export class Reveal implements OnInit {

  revealed = signal(false);
  players: Player[] = [];
  currentIndex = signal(0);
  displayedWord = '';
  currentHint = '';
  hintType: HintType = 'none';

  currentPlayerName = computed(() => {
    return this.players[this.currentIndex()]?.name ?? '';
  });

  isImpostor = computed(() => {
    const player = this.players[this.currentIndex()];
    return player?.role === 'impostor';
  });

  isLastPlayer = computed(() => {
    return this.currentIndex() === this.players.length - 1;
  });

  isFirstPlayer = computed(() => {
    return this.currentIndex() === 0;
  });

  constructor(
    public gameStateService: GameStateService,
    private router: Router,
    private dialog: MatDialog,
    private gameData: GameDataService,
    private translate: TranslateService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.players = structuredClone(
      this.gameStateService.game.players
    );
    this.revealWord();
    this.hintType = this.gameStateService.game.hintType;
    this.showHint();
    this.loadingService.hide();
  }

  revealWord() {
    const [cat, word] = this.gameStateService.game.word.split('.');
    this.gameData
      .getWord(cat, word, this.translate.getCurrentLang())
      .subscribe(text => {
        this.displayedWord = text;
      });
  }

  showHint() {
    const [cat, word] = this.gameStateService.game.word.split('.');
    this.gameData
      .getRandomHint(cat, word, this.translate.getCurrentLang())
      .subscribe(hint => {
        this.currentHint = hint;
      });
  }

  onDragEnd(event: CdkDragEnd) {
    event.source.reset();      // siempre vuelve a su sitio
    this.revealed.set(true);   // 👈 ahora es signal
  }

  play() {
    this.revealed.set(false);

    this.gameStateService.update({
      state: 'choosing'
    });

    this.gameStateService.allowNavigationOnce();
    this.router.navigate(['/choice']);
  }

  next() {
    this.revealed.set(false);

    if (this.currentIndex() < this.players.length - 1) {
      this.currentIndex.update(i => i + 1);
    }
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
      disableClose: true,
      width: '320px'
    });

    return ref.afterClosed().toPromise();
  }
}
