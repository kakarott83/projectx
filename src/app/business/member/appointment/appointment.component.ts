import { Component, OnInit } from '@angular/core';
import { Member } from '../../../model/member';
import { SharedService } from '../../../services/shared.service';
import { MemberDate } from '../../../model/memberDate';
import { MaterialModule } from '../../../material/material.module';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';

@Component({
  selector: 'app-appointment',
  imports: [MaterialModule, JsonPipe, DatePipe],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent implements OnInit {
  myMember: Member;
  appointments: MemberDate[] = []
  displayedColumns: string[] = ['id', 'date', 'reason','comment','edit']

  constructor(
    protected shared: SharedService,
    private dialog: MatDialog
  ) {
    this.myMember = shared.CurrentMember??{}
  }

  ngOnInit(): void {
    this.appointments = this.myMember.appointments??[];
  }

  addAppointment() {

    this.openDialog();
    
  }

  editAppointment(id: number) {
    console.log(id)
    const item = this.appointments.find(i => i.id === id);
    this.openDialog(item);
  }

  removeAppointment(id: number) {

  }

  openDialog(existingMemberDate?: MemberDate) {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '400px',
      data: existingMemberDate || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(existingMemberDate) {
          const index = this.appointments.findIndex(a => a === existingMemberDate);
          if(index !== -1) {
            this.appointments[index] = result
          }
        } else {
          this.appointments.push(result)
        }
      }
    })
  }

  

}
