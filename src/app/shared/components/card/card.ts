import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Item } from '../../../core/models/item.model';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Button } from '../button/button';

@Component({
  selector: 'app-card',
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, TranslateModule, Button],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone: true
})


export class MenuCard {

  @Input() items: Item[] = [];
  @Output() addAction = new EventEmitter<Item>();
  @Output() removeAction = new EventEmitter<Item>();

  constructor(private router: Router) { }

  add(item: Item) {
    this.addAction.emit(item);
  }

  remove(item: Item) {
    this.removeAction.emit(item);
  }

  settings(item: Item) {
    switch (item.id) {
      case 'mode':
        this.router.navigate(['/mode']);
        break;
      case 'players':
        this.router.navigate(['/players']);
        break;
      case 'impostors':
        this.router.navigate(['/impostors']);
        break;
      case 'hints':
        this.router.navigate(['/hints']);
        break;
      case 'packages':
        this.router.navigate(['/packages']);
        break;
      case 'duration':
        this.router.navigate(['/duration']);
        break;
    }
  }
}
