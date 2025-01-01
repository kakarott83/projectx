import { Component, inject } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [MaterialModule, RouterLink, JsonPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  authService = inject(AuthService)
  
  logout() {
    this.authService.logout()
  }

}
