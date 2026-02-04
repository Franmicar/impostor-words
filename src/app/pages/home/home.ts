import { Component, OnInit } from '@angular/core';
import { MenuCard } from "../../shared/components/card/card";
import { Item } from '../../core/models/item.model';
import { GameConfig } from '../../core/services/game-config';
import { Router } from '@angular/router';
import { Button } from '../../shared/components/button/button';
import { GameStateService } from '../../core/services/game-state';
import { TitleComponent } from '../../shared/components/title/title';

@Component({
  selector: 'app-home',
  imports: [MenuCard, Button, TitleComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone: true
})

export class Home implements OnInit {

  items: Item[] = [];

  constructor(private configService: GameConfig, private router: Router, private gameState: GameStateService) { }

  ngOnInit(): void {
    this.createMenu();
  }

  createMenu() {
    this.items = [
      {
        id: 'mode',
        icon: 'view_comfy_alt',
        title: 'gameMode',
        info: this.configService.config.mode,
        settings: true
      },
      {
        id: 'players',
        icon: 'groups_3',
        title: 'players',
        amount: this.configService.config.players.length,
        settings: true
      },
      {
        id: 'impostors',
        icon: 'person_4',
        title: 'impostors',
        amount: this.configService.config.impostors,
        buttons: true
      },
      {
        id: 'hints',
        icon: 'search',
        title: 'hints',
        info: this.configService.config.hints,
        settings: true
      },
      {
        id: 'packages',
        icon: 'inventory_2',
        title: 'packages',
        info: 'selected',
        amount: this.configService.config.packages.length,
        settings: true
      },
      {
        id: 'duration',
        icon: 'timer',
        title: 'duration',
        info: 'minutes',
        amount: this.configService.config.duration,
        settings: true
      }
    ];
  }

  onAdd(item: Item) {
    let max;
    switch (item.id) {
      case 'impostors':
        max = this.configService.config.players.length - 2;
        if (item.amount && item.amount < max) {
          item.amount++;
          this.configService.update({
            impostors: item.amount
          });
        }
        break;
      case 'detectives':
        max = this.configService.config.maxPlayers;
        if (item.amount && max && item.amount < max) {
          item.amount++;
          // this.configService.config.players = item.amount;
        }
        break;
    }
  }

  onRemove(item: Item) {
    let min;
    switch (item.id) {
      case 'impostors':
        min = this.configService.config.minImpostors;
        if (item.amount && min && item.amount > min) {
          item.amount--;
          this.configService.update({
            impostors: item.amount
          });
        }
        break;
      case 'detectives':
        min = this.configService.config.minPlayers;
        if (item.amount && min && item.amount > min) {
          item.amount--;
          // this.configService.config.players = item.amount;
        }
        break;
    }
  }

  play() {
    this.gameState.startGame();
    setTimeout(() => {
      this.router.navigate(['/reveal']);
    }, 2000);
  }

}
