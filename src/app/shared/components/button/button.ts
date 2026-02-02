import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule, TranslateModule, MatIconModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  standalone: true
})

export class Button {

  @Input() label!: string;
  @Input() color: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() variant: 'filled' | 'icon' | 'miniFab' | 'fab' = 'filled';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() icon: string | null = null;
  @Input() disabled: boolean = false;

  @Output() action = new EventEmitter<void>();


  onAction() {
    this.action.emit();
  }
}
