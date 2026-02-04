import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GameConfig } from '../../core/services/game-config';
import { Router } from '@angular/router';
import { DataCard, Data } from '../../shared/components/data-card/data-card';
import { Button } from '../../shared/components/button/button';
import { ModeType } from '../../core/models/configuration.model';
import { TitleComponent } from '../../shared/components/title/title';

@Component({
  selector: 'app-mode',
  imports: [MatCardModule, DataCard, Button, TitleComponent],
  templateUrl: './mode.html',
  styleUrl: './mode.scss',
})
export class Mode implements OnInit {

  selectedMode!: ModeType;

  constructor(private configService: GameConfig, private router: Router) { }

  data: Data[] = [
    {
      title: 'classic',
      img: 'images/modes/impostor.jpg',
      description: 'mode.classic',
    },
    {
      title: 'mysterious',
      img: 'images/modes/detective.png',
      description: 'mode.mysterious',
    },
    {
      title: 'chaos',
      img: 'images/modes/caos.jpeg',
      description: 'mode.chaos',
    },
    {
      title: 'custom',
      img: 'images/modes/custom.jpg',
      description: 'mode.custom',
    },
  ];

  ngOnInit(): void {
    this.selectedMode = this.configService.config.mode;
  }

  selectMode(mode: ModeType) {
    this.selectedMode = mode;
  }

  save() {
    this.configService.update({ mode: this.selectedMode });
    this.router.navigate(['/home']);
  }
}
