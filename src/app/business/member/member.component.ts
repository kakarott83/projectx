import { Component, computed, EventEmitter, Inject, inject, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
import { HelpersService } from '../../services/helpers.service';
import { Member } from '../../model/member';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MY_FORMATS } from '../../app.config';
import moment from 'moment';
import { MainDataComponent } from './main-data/main-data.component';
import { PositionComponent } from './position/position.component';
import { FirestoreService } from '../../services/firestore.service';
import { BehaviorSubject, Subscribable, Subscription, take } from 'rxjs';
import { SharedService } from '../../services/shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member',
  imports: [MaterialModule, JsonPipe, MainDataComponent, PositionComponent, AsyncPipe],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'de-DE'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    CurrencyPipe
  ]
})
export class MemberComponent implements OnInit, OnDestroy {

  // private dataStream = new BehaviorSubject<Member | null>(null);
  // dataStream$ = this.dataStream.asObservable();
  
  memberForm!: FormGroup;
  mainDataForm!: FormGroup;
  isLoading = false;
  teamList = ['FOMO','BOCH','BODAT'];
  helpers = inject(HelpersService);
  myMember: Member;
  formattedAmount: string | null = null;
  subShared!: Subscription


  constructor(
    private fb: FormBuilder,
    private currencyPipe: CurrencyPipe,
    private fsService: FirestoreService,
    protected shared: SharedService,
    private route: ActivatedRoute

  ) { 
    this.myMember = shared.CurrentMember??{};
  }



  ngOnInit(): void {
    this.memberForm = this.fb.group({
      name: [],
      firstName: [],
      email: [],
      uid: [],
    })

    this.route.paramMap.subscribe(params => {
      const memberId = Number(params.get('id'));
      this.subShared = this.fsService.getMember(memberId)
      .pipe(
        take(1)
      )
      .subscribe(member => {
        this.mapForm(member);
        this.shared.setMember(member);
      })

    })

    this.memberForm.valueChanges.subscribe(data => {
      Object.assign(this.myMember, data)
      this.shared.setMember(this.myMember)
    })

  }

  mapForm(member: Member) {
    this.memberForm.patchValue(member)
  }

  onSubmit() {
    console.log(this.shared.CurrentMember)
  }

  ngOnDestroy(): void {
    this.subShared.unsubscribe()
  }





}
