import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-home',
  imports: [MaterialModule,JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  authService = inject(AuthService);
  userForm!: FormGroup;
  notificationService = inject(NotificationService)

  constructor(private fb: FormBuilder) {
    this.userForm = fb.group({
      newName: ['',[Validators.required]]
    })
  }

  get newName() {
    return this.userForm.get('newName')
  }

  get isValid() {
    return this.userForm.valid;
  }

  onSubmit() {
    this.authService.updateUserName(this.newName?.value).subscribe({
      next: () => this.notificationService.showSuccess('Änderung erfolgreich'),
      error: (err) => this.notificationService.showError(err)
    })
  }



}
