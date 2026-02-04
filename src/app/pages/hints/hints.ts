import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { GameConfig } from '../../core/services/game-config';
import { Data, DataCard } from '../../shared/components/data-card/data-card';
import { HintType } from '../../core/models/configuration.model';
import { Button } from '../../shared/components/button/button';
import { TitleComponent } from '../../shared/components/title/title';

@Component({
  selector: 'app-hints',
  imports: [MatCardModule, DataCard, Button, TitleComponent],
  templateUrl: './hints.html',
  styleUrl: './hints.scss',
})
export class Hints implements OnInit {

  selectedHint!: HintType;

  data: Data[] = [
    {
      title: "first",
      description: "hintsText.first",
    },
    {
      title: "all",
      description: "hintsText.all",
    },
    {
      title: "none",
      description: "hintsText.none",
    },
  ];

  constructor(private router: Router, private gameService: GameConfig) { }

  ngOnInit(): void {
    this.selectedHint = this.gameService.config.hints;
  }

  selectHint(hint: HintType) {
    this.selectedHint = hint;
  }

  save() {
    this.gameService.update({ hints: this.selectedHint });
    this.router.navigate(['/home']);
  }

}
