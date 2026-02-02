import { Component, OnInit } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Router } from '@angular/router';
import { GameConfig } from '../../core/services/game-config';
import { GameStateService } from '../../core/services/game-state';
import { Player } from '../../core/models/player.model';
import { MatDialog } from '@angular/material/dialog';
import { GenericModal, GenericModalData } from '../../shared/modals/generic-modal/generic-modal';
import { DataCard } from '../../shared/components/data-card/data-card';

@Component({
  selector: 'app-vote',
  imports: [Button, DataCard],
  templateUrl: './vote.html',
  styleUrl: './vote.scss',
})
export class Vote implements OnInit {

  players: Player[] = [];
  selectedPlayer: number | null = null;

  constructor(private router: Router, private gameStateService: GameStateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.players = this.gameStateService.game.players;
  }

  submitVote() {
    this.gameStateService.vote(this.selectedPlayer!);
    this.gameStateService.allowNavigationOnce();
    this.router.navigate(['/kill-result']);
  }

  selectPlayer(playerId: number) {
    this.selectedPlayer = playerId;
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
