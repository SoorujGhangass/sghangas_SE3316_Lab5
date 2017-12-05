import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { StartPageComponent } from './components/start-page/start-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ImageSearchComponent } from './components/image-search/image-search.component';
import { AppRoutingModule } from './app-routing.module'; //Why was there a '//'
import { LogService } from './services/log.service';
import { ImageSearchService } from './services/image-search.service';
import { LogComponent } from './components/log/log.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { MyCollectionsComponent } from './components/my-collections/my-collections.component';

import {AuthGuard} from './guards/auth.guard';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { CreateCollectionComponent } from './components/create-collection/create-collection.component';
import { EditCollectionComponent } from './components/edit-collection/edit-collection.component';
import { ViewCollectionComponent } from './components/view-collection/view-collection.component';


@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    LoginComponent,
    RegisterComponent,
    ImageSearchComponent,
    LogComponent,
    NavbarComponent,
    MyCollectionsComponent,
    ConfirmationComponent,
    CreateCollectionComponent,
    EditCollectionComponent,
    ViewCollectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    HttpModule
  ],
  providers: [ImageSearchService, LogService, ValidateService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
