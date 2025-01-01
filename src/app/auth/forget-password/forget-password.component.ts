import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-forget-password',
  imports: [MaterialModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  forgetPasswordForm!: FormGroup

  constructor(private fb: FormBuilder, private router: Router) {
    
    this.forgetPasswordForm = fb.group({
      email: ['',[Validators.required, Validators.email]]
    })
  }

  get email() {
    return this.forgetPasswordForm.get('email')
  }

  get isValid() {
    return this.forgetPasswordForm.valid
  }

  onSubmit() {
    this.router.navigate(['/login'])
  }

  
}
