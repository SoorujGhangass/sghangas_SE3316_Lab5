import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ImageSearchComponent } from './image-search/image-search.component';
import { AppRoutingModule } from './/app-routing.module';
import { LogService } from './log.service';
import { LogComponent } from './log/log.component';


@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    LoginComponent,
    RegisterComponent,
    ImageSearchComponent,
    LogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ImageSearchService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
