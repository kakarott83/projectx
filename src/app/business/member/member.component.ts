import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { HelpersService } from '../../services/helpers.service';
import { Member } from '../../model/member';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../app.config';
import moment from 'moment';
import { MainDataComponent } from './main-data/main-data.component';
import { PositionComponent } from './position/position.component';

@Component({
  selector: 'app-member',
  imports: [MaterialModule, JsonPipe, MainDataComponent, PositionComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    CurrencyPipe

  ]
})
export class MemberComponent {

  
  
  memberForm!: FormGroup;
  isLoading = false;
  teamList = ['FOMO','BOCH','BODAT'];
  helpers = inject(HelpersService);
  myMember: Member = {};
  formattedAmount: string | null = null;

  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe
  ) {
    this.memberForm = fb.group({
      name: ['Mustermann'],
      firstName: ['Max'],
      birthday: [new Date()],
      age: [{ value: 26, disabled: true }],
      street: ['Waldweg'],
      housenumber: ['5a'],
      email: ['mm@test.de'],
      uid: ['123'],
      team: ['FOMO'],
      zip: ['80689'],
      city: ['München'],
      position: ['Business Consultant'],
      entryDate: [new Date()],
      currSalary: [5800.05],
    })

    

    /*Observerable*/
    this.setObserver()
    
  }



  onSubmit() {
    console.log(this.createMember(),'MyMember')
  }

  createMember(): Member {
    return this.myMember = {
      name: this.memberForm.get('name')?.value!,
      firstName: this.memberForm.get('firstName')?.value!,
      birthday: new Date(this.memberForm.get('birthday')?.value)!,
      age: this.memberForm.get('age')?.value!,
      street: this.memberForm.get('age')?.value!,
      housenumber: this.memberForm.get('housenumber')?.value!,
      email: this.memberForm.get('email')?.value!,
      team: this.memberForm.get('team')?.value!,
      zip: this.memberForm.get('zip')?.value!,
      city: this.memberForm.get('city')?.value!,
      position: this.memberForm.get('position')?.value!,
      entryDate: new Date(this.memberForm.get('entryDate')?.value)!,
      currSalary: this.helpers.formatDbAmount(this.memberForm.get('housenumber')?.value!),
    }
  }

  setObserver() {
    this.memberForm.get('birthday')?.valueChanges.subscribe(data => {
      const age = this.helpers.calcAge(data)
      this.memberForm.get('age')?.setValue(age);
    })
  }





}
