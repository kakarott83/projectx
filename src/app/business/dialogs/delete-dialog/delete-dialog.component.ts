import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  imports: [MaterialModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {content: string} 
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Nutzer bestätigt mit "Ja"
  }

  onCancel(): void {
    this.dialogRef.close(false); // Nutzer lehnt ab mit "Nein"
  }

  
}
