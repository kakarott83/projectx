import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { Member } from '../../../model/member';
import { SharedService } from '../../../services/shared.service';
import { HelpersService } from '../../../services/helpers.service';

@Component({
  selector: 'app-main-data',
  imports: [MaterialModule, JsonPipe],
  templateUrl: './main-data.component.html',
  styleUrl: './main-data.component.scss'
})
export class MainDataComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  mainDataForm!: FormGroup;
  myMember!: Member;
  subShared!: Subscription

  constructor(
    private fb: FormBuilder,
    private shared: SharedService,
    private helperService: HelpersService
  ) {  }

  ngOnInit(): void {
    this.subShared = this.shared.memberSource$.subscribe((member) => {
      if(member) {
        this.myMember = member;
        this.initForm(this.myMember);
      }
    })
  }

  initForm(member: Member) {
   this.mainDataForm = this.fb.group({
      birthday: member.birthday,
      age: this.helperService.calcAge(member.birthday?.toString()),
      street: member.street,
      housenumber: member.housenumber,
      zip: member.zip,
      city: member.city
    })
    this.mainDataForm.valueChanges.subscribe(data => {
      this.setMember()
    })
  }

  setMember() {
    this.myMember.age = this.mainDataForm.get('age')?.value;
    this.myMember.birthday = this.mainDataForm.get('birthday')?.value;
    this.myMember.street = this.mainDataForm.get('street')?.value;
    this.myMember.housenumber = this.mainDataForm.get('housenumber')?.value;
    this.myMember.zip = this.mainDataForm.get('zip')?.value;
    this.myMember.city = this.mainDataForm.get('city')?.value;
    this.shared.setMember(this.myMember);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes,'Changes')
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit')
  }

  ngOnDestroy(): void {
    this.subShared.unsubscribe()
  }

}
