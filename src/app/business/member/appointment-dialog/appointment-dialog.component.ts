import { Component, Inject } from '@angular/core';
import { MemberDate } from '../../../model/memberDate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-appointment-dialog',
  imports: [MaterialModule],
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.scss',
    providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]}
    ]
})
export class AppointmentDialogComponent {

  appointmentForm: FormGroup;
  reasonList = ['Quartalsgespräch','End Review','Außerordentlich'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MemberDate | null
  ) {

    this.appointmentForm = this.fb.group({
      date: [data?.date ? new Date(data.date): ''],
      reason: [data?.reason],
      comment: [data?.comment]
    })

  }

  onCancel(): void {
    this.dialogRef.close()
  }

  onSave(): void {
    if(this.appointmentForm.valid) {
      this.dialogRef.close(this.appointmentForm.value)
    }
  }

}
