import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Button } from '../../components/button/button';
import { TranslateModule } from '@ngx-translate/core';

export interface GenericModalData {
  title: string;
  message: string;
  acceptText?: string;
}

@Component({
  selector: 'app-generic-modal',
  imports: [MatDialogModule, Button, TranslateModule],
  templateUrl: './generic-modal.html',
  styleUrl: './generic-modal.scss',
})
export class GenericModal {

  constructor(
    private dialogRef: MatDialogRef<GenericModal>,
    @Inject(MAT_DIALOG_DATA) public data: GenericModalData
  ) { }

  accept() {
    this.dialogRef.close(true);
  }

  close() {
    this.dialogRef.close(false);
  }
}
