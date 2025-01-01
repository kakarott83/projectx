import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { HomeComponent } from './business/home/home.component';
import { authguardGuard } from './auth/authguard.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgetPassword', component: ForgetPasswordComponent},
    {
        path: 'home', 
        loadComponent: () => import('./business/home/home.component').then((m) => m.HomeComponent),  
        canActivate: [authguardGuard]
    },
    {path: '**', component: NotFoundComponent}
];
