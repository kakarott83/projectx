import { Component, OnInit } from '@angular/core';
import { Member } from '../../../model/member';
import { SharedService } from '../../../services/shared.service';
import { MemberDate } from '../../../model/memberDate';
import { MaterialModule } from '../../../material/material.module';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { DeleteDialogComponent } from '../../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-appointment',
  imports: [MaterialModule, DatePipe, JsonPipe],
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
    const item = this.appointments.find(i => i.id === id);
    this.openDialog(item);
  }

  removeAppointment(id: number) {
    //this.appointments = this.appointments.filter(a => a.id !== id);
    this.openDeleteDialog(id)
  }

  openDialog(existingMemberDate?: MemberDate) {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '400px',
      data: existingMemberDate || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        if(existingMemberDate) {
          this.appointments = this.appointments.map(a => {
            return a.id === existingMemberDate.id ? {...result} : a
          })
        } else {
          const id = this.appointments.length + 1
          result.id = id
          this.appointments = [...this.appointments, result]
        }
      }
    })
  }

  openDeleteDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { content: 'Soll dieser Satz wirklich gelöscht werden?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.appointments = this.appointments.filter(a => a.id !== id);
      }
    })
  }
}
