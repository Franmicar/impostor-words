import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { Button } from '../../shared/components/button/button';
import { Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { GameConfig } from '../../core/services/game-config';
import { FormsModule } from '@angular/forms';
import { TitleComponent } from '../../shared/components/title/title';

@Component({
  selector: 'app-duration',
  imports: [TranslateModule, MatDividerModule, MatCardModule, Button, MatRadioModule, FormsModule, TitleComponent],
  templateUrl: './duration.html',
  styleUrl: './duration.scss',
  standalone: true
})
export class Duration implements OnInit {

  selectedMinutes = 0;

  minutes = Array.from({ length: 30 }, (_, i) => i + 1);

  constructor(private router: Router, private gameConfigService: GameConfig) { }

  ngOnInit(): void {
    this.selectedMinutes = this.gameConfigService.config.duration;
  }

  getMinuteLabel(i: number): string {
    return i === 1 ? 'minute' : 'minutes';
  }

  save() {
    this.gameConfigService.update({
      duration: this.selectedMinutes,
    });
    this.router.navigate(['/home']);
  }

  onMinutesChange(value: number) {
    this.selectedMinutes = value;
  }
}
