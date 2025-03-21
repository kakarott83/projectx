import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Member } from '../model/member';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  constructor() { }

  private myMemberSource = new BehaviorSubject<Member | null>(null);
  memberSource$ = this.myMemberSource.asObservable();

  update(member: Member) {
    this.myMemberSource.next(member);
  }

  setMember(member: Member) {
    this.myMemberSource.next(member)
  }

  get CurrentMember() {
    return this.myMemberSource.value
  }

}
