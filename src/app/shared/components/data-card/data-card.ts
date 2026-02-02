import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { Package } from '../../../core/models/package.model';

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

  @Input() data!: Data | Package;
  ngOnInit(): void {
    this.getTitle();
  }

  isData(data: Data | Package): data is Data {
    return (data as Data).title !== undefined;
  }

  getTitle() {
    if (this.isData(this.data)) {
      this.title = this.data.title || '';
    } else {
      this.title = 'categories.' + this.data.category || '';
    }
  }

  onClick() {
    this.clicked.emit(this.data);
  }
}
