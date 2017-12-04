import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {StartPageComponent} from './components/start-page/start-page.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ImageSearchComponent} from './components/image-search/image-search.component';
import {MyCollectionsComponent} from './components/my-collections/my-collections.component';
import {ConfirmationComponent} from './components/confirmation/confirmation.component';

import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'home', component:StartPageComponent},
  {path:'register', component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'image-search',component:ImageSearchComponent},
  {path:'my-collections',component:MyCollectionsComponent, canActivate: [AuthGuard]},
  {path:'confirmation',component:ConfirmationComponent}]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports:[RouterModule]
})
export class AppRoutingModule { }
