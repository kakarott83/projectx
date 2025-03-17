import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Member } from '../../model/member';
import { FirestoreService } from '../../services/firestore.service';
import { MaterialModule } from '../../material/material.module';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-member-list',
  imports: [MaterialModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent implements OnInit {

  memberList: Member[] = [];
  isLoading = false;
  displayedColumns: string[] = ['id', 'name', 'firstname','email','age','edit']

  constructor(
    private fsService: FirestoreService,
    private router: Router,
    private helperService: HelpersService

  ) {}


  ngOnInit(): void {
    this.isLoading = true
    this.fsService.getMembers()
    .pipe(
      map(items =>
        items.map((member: Member) => ({
          ...member,
          age: this.helperService.calcAge(member.birthday)
        }))
      )
    )
    .subscribe(data => {
      this.isLoading = false
      this.memberList = data;
      console.log(data,'MemberList')
    })
  }

  calcAge(birthday: string | Date | undefined): number {
    if (!birthday) return 0;
  
    const birth = new Date(birthday);
    const today = new Date();
  
    let age = today.getFullYear() - birth.getFullYear();
    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
    ) {
      age--;
    }
  
    return age;
  }

  editUser(id: number) {
    this.router.navigate(['/member',id])
  }

  

}
