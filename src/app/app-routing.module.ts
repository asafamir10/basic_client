import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './auth/register/register.component'
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './main/home/home.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'register',
    component: RegisterComponent,

  },
  {
    path: 'home',
    component: HomeComponent,

  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)
  ,BrowserModule
  ],

  exports: [
    RouterModule,
  
  
  ]
})
export class AppRoutingModule { }
