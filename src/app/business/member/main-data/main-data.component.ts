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
  ) {  
    this.myMember = this.shared.CurrentMember??{};
  }

  ngOnInit(): void {
    this.initForm(this.myMember);
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
      Object.assign(this.myMember,data);
      this.shared.setMember(this.myMember)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes,'Changes')
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit')
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }

}
