import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;
    authService = inject(AuthService);
    notificationService = inject(NotificationService);

  constructor(
    private fb: FormBuilder, 
    private router: Router) {
    
    this.loginForm = fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    })}

    get email() {
      return this.loginForm.get('email')
    }

    get password() {
      return this.loginForm.get('password')
    }

    get isValid() {
      return this.loginForm.valid
    }

    onSubmit() {
      if(this.isValid) {
        this.authService.login(this.email?.value,this.password?.value).subscribe({
          next: () => { console.log('Login')},
          error: (err) => this.notificationService.showError(err)
        })
      }
    }



}
