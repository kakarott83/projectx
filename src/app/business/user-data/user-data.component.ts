import { Component, inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirestoreService } from '../../services/firestore.service';
import { AuthService } from '../../auth/auth.service';
import { NotificationService } from '../../services/notification.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-user-data',
  imports: [MaterialModule, JsonPipe],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss'
})
export class UserDataComponent implements OnInit {

  userDataForm!: FormGroup;
  fireStore = inject(FirestoreService)
  authService = inject(AuthService);
  notificationService = inject(NotificationService)
  isLoading = false;
  rolesList = ['Admin', 'Member','Teammanager'];
  teamList = ['FOMO','BOCH','BODAT'];
  userData: any;

  constructor(private fb: FormBuilder) {
    this.userDataForm = fb.group({
      email: [{value: '', disabled: true}],
      name: [''],
      uid: [''],
      roles: [['']],
      team: ['']
    })
    this.isLoading = true
  }

  ngOnInit(): void {
    this.authService.user$.subscribe({
      next: (data) => {
        const uid = data?.uid
        if (uid !== undefined) {
          this.loadingUserData(uid);
        }
      },
      error: (err) => this.notificationService.showError(err)
    }
   )

  }

  loadingUserData(uid: string) {
    this.fireStore.getUserDataByIdOnce('userData',uid)
    .then(data => {
      console.log(data,'loadingUserData')
      this.userDataForm.patchValue({
        email: data.email,
        name: data.name,
        uid: data.uid,
        roles: data.roles,
        team: data.team
      })
      this.changeState(this.userDataForm.disabled);
      this.isLoading = false
    })
    .catch((err) => {
      this.notificationService.showError(err);
      this.isLoading = false
    })

  }

  get isValid() {
    return this.userDataForm.valid;
  }

  get uid () {
    return this.userDataForm.get('uid')?.value
  }

  onSubmit(uid: string) {
    console.log(this.userDataForm.value);
    this.changeState(this.userDataForm.disabled);
    this.createData()
    this.fireStore.updateDocument('userData', uid, this.userData)
      .then( () => this.notificationService.showSuccess('User aktualisiert'))
      .catch( (err) => this.notificationService.showError(err))
  }

  changeState(isDisabled: boolean) {
    isDisabled === true ? this.userDataForm.enable() : this.userDataForm.disable()
  }

  createData() {
    this.userData = {
      email: this.userDataForm.get('email')?.value,
      name: this.userDataForm.get('name')?.value,
      uid: this.userDataForm.get('uid')?.value,
      roles: this.userDataForm.get('roles')?.value,
      team: this.userDataForm.get('team')?.value
    }
  }
}
