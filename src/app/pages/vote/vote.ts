import { Component, OnInit } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { Router } from '@angular/router';
import { GameConfig } from '../../core/services/game-config';
import { GameStateService } from '../../core/services/game-state';

@Component({
  selector: 'app-vote',
  imports: [Button],
  templateUrl: './vote.html',
  styleUrl: './vote.scss',
})
export class Vote implements OnInit {

  players: string[] = [];
  selectedPlayer: number | null = null;

  constructor(private router: Router, private gameService: GameConfig, gameStateService: GameStateService) { }

  ngOnInit(): void {
    // this.players = this.gameService.config.names;
  }

  vote(playerId: number) {
    this.selectedPlayer = playerId;
  }

  submitVote() {
    console.log('Voto enviado:', this.selectedPlayer);
  }
}
