import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { passwordMatchValidator } from '../../helpers/validators';
import { JsonPipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-register',
  imports: [MaterialModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm!: FormGroup
  authService = inject(AuthService)
  notificationService = inject(NotificationService)

  constructor(
    private fb: FormBuilder
  ) {
    
    this.registerForm = fb.group(
    {
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['',[Validators.required, Validators.minLength(6)]],
    },
    {
      validators: passwordMatchValidator('password', 'passwordRepeat')
    })
  }

  get userName() {
    return this.registerForm.get('userName')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get passwordRepeat() {
    return this.registerForm.get('passwordRepeat')
  }

  get isValid() {
    return this.registerForm.valid
  }

  onSubmit() {
    if(this.isValid) {
      this.authService.register(this.email?.value,this.userName?.value,this.password?.value).subscribe({
        next: () => this.notificationService.showSuccess('Registrierung erfolgreich'),
        error: (err) => this.notificationService.showError(err)
      })
    }
  }
}
