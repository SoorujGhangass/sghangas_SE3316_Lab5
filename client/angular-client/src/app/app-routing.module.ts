import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {StartPageComponent} from './start-page/start-page.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ImageSearchComponent} from './image-search/image-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component:StartPageComponent},
  {path:'register', component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'image-search',component:ImageSearchComponent}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }