import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { GameConfig } from '../../core/services/game-config';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from '../../shared/components/button/button';
import { Player } from '../../core/models/player.model';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { TitleComponent } from '../../shared/components/title/title';

@Component({
  selector: 'app-players',
  imports: [MatCardModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule, Button, DragDropModule, TitleComponent],
  templateUrl: './players.html',
  styleUrl: './players.scss',
})
export class Players implements OnInit {

  form!: FormGroup;

  constructor(
    private configService: GameConfig,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const names = this.configService.config.players.map(p => p.name);

    this.form = this.fb.group({
      names: this.fb.array(
        names.map(name =>
          this.fb.control(name, { nonNullable: true })
        )
      ),
    });
  }

  get names(): FormArray<FormControl<string>> {
    return this.form.get('names') as FormArray<FormControl<string>>;
  }

  addPlayer() {
    this.names.push(
      this.fb.control(`Jugador ${this.names.length + 1}`, { nonNullable: true })
    );
  }

  removePlayer(index: number) {
    this.names.removeAt(index);
  }

  // 🔥 DRAG & DROP REAL (reordena el FormArray)
  drop(event: CdkDragDrop<FormControl<string>[]>) {
    moveItemInArray(
      this.names.controls,
      event.previousIndex,
      event.currentIndex
    );
  }

  // 💾 GUARDAR → { position, name }
  save() {
    const players: Player[] = this.names.controls.map((control, index) => ({
      position: index + 1,
      name: control.value.trim() || `Jugador ${index + 1}`,
    }));

    this.configService.update({ players });
    this.router.navigate(['/home']);
  }
}
