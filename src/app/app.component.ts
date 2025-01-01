import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    AuthModule, 
    MaterialModule,
    NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  authService = inject(AuthService);
  
  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if(user) {
        console.log(user,'User')
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
          uid: user.uid!
        })
      } else {
        this.authService.currentUserSig.set(null)
      }
      console.log(this.authService.currentUserSig(),'AppCopoment Init')
    })
  }

  

}
