import { inject } from '@angular/core';
import { CanActivateFn, UrlTree, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';

export const authguardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const notification = inject(NotificationService)
  const isLoggedIn = true;

  if(!isLoggedIn) {
    notification.showError('You are not authentificated')
  }

  return isLoggedIn ? true : false;
};
