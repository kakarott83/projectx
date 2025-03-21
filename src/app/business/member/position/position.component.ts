import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../../material/material.module';
import { Observable, Subscription } from 'rxjs';
import { Member } from '../../../model/member';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-position',
  imports: [MaterialModule],
  templateUrl: './position.component.html',
  styleUrl: './position.component.scss'
})
export class PositionComponent implements OnInit {

    positionForm!: FormGroup;
    myMember: Member;
    teamList = ['FOMO','BOCH','BODAT'];
    subShared!: Subscription
  
    constructor(
      private fb: FormBuilder,
      private shared: SharedService
    ) { 
      this.myMember = this.shared.CurrentMember??{};
    }


  ngOnInit(): void {
    // this.subShared = this.shared.memberSource$.subscribe((member) => {
    //   if(member) {
    //     this.myMember = member;
    //     this.initForm(this.myMember);
    //   }
    // })
    this.initForm(this.myMember);
  }

  initForm(member: Member) {
    console.log(member?.team)
    this.positionForm = this.fb.group({
      team: member?.team,
      position: member?.position,
      entryDate: member?.entryDate,
      currSalary: member?.currSalary,
     })
     this.positionForm.valueChanges.subscribe(data => {
       //this.setMember()
       console.log(data, 'Data');
       Object.assign(this.myMember,data)
       console.log(this.myMember,'MyMember')
       this.shared.setMember(this.myMember)
     })
   }

   setMember() {
    if(this.myMember) {
      this.myMember.team = this.positionForm.get('team')?.value;
      this.myMember.position = this.positionForm.get('position')?.value;
      this.myMember.entryDate = this.positionForm.get('entryDate')?.value;
      this.myMember.currSalary = this.positionForm.get('currSalary')?.value;
      this.shared.setMember(this.myMember);
    }
  }

}
