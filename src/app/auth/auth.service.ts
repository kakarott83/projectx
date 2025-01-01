import { inject, Injectable, signal } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile, User } from 'firebase/auth';
import { from, Observable } from 'rxjs';
import { UserInterface } from '../model/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth);
  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);


  constructor(private router: Router) { }

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password
    )
    .then(
      response => {
        updateProfile(response.user, {displayName: username})
        this.router.navigate(['/home']);
      });

    return from(promise)
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    )
    .then(response => {
      this.router.navigate(['/home']);
    });

    return from(promise)
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    this.router.navigate(['/login']);
    
    return from(promise)
  }

  updateUserName(name: string): Observable<void> {
    const currAuth = this.firebaseAuth.currentUser;
    let result = new Observable<void>;
    if(currAuth != null) {
      const promise = updateProfile(currAuth, {displayName: name})
      return from(promise)
    }

    return result
  }

}