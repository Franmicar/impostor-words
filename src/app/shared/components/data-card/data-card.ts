import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { Package } from '../../../core/models/package.model';
import { Player } from '../../../core/models/player.model';

export interface Data {
  title?: string;
  img?: string;
  text?: string;
}

@Component({
  selector: 'app-data-card',
  imports: [MatCardModule, TranslateModule],
  templateUrl: './data-card.html',
  styleUrl: './data-card.scss',
})
export class DataCard implements OnInit {

  @Input() selected = false;

  @Output() clicked = new EventEmitter<any>();

  title: string = '';
  dataIsPlayer: boolean = false;

  @Input() data!: Data | Package | Player;
  ngOnInit(): void {
    this.getTitle();
  }

  isData(data: Data | Package | Player): data is Data {
    return (data as Data).title !== undefined;
  }

  isPlayer(data: Data | Package | Player): data is Player {
    return (data as Player).position !== undefined;
  }

  hasText(data: Data | Package | Player): data is Data | Package {
    return (data as any).text !== undefined;
  }

  getTitle() {
    if (this.isData(this.data)) {
      this.title = this.data.title || '';
    } else if (this.isPlayer(this.data)) {
      this.title = this.data.name || '';
      this.dataIsPlayer = true;
    } else {
      this.title = 'categories.' + this.data.category || '';
    }
  }

  onClick() {
    this.clicked.emit(this.data);
  }
}
