import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-title',
  imports: [TranslateModule],
  templateUrl: './title.html',
  styleUrl: './title.scss',
})
export class TitleComponent {

  @Input() title: string = '';

}
