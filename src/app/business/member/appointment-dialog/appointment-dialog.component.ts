import { Component, Inject } from '@angular/core';
import { MemberDate } from '../../../model/memberDate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../material/material.module';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { JsonPipe } from '@angular/common';
import moment from 'moment';

export const MY_DATE_FORMATS = {
  parse: { dateInput: 'DD.MM.YYYY' },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
}


@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  imports: [MaterialModule, JsonPipe, MatMomentDateModule],
  templateUrl: './appointment-dialog.component.html',
  styleUrl: './appointment-dialog.component.scss',
    providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
      {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
      { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
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
      date: [this.formatDate(data?.date)],
      reason: [data?.reason || '', Validators.required],
      comment: [data?.comment || '']
    })

  }

  private formatDate(date: string | Date | undefined): any {
    return date ? moment(date).toDate() : null;
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
