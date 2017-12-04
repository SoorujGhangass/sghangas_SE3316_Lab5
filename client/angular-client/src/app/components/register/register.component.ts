import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  password: String;
  
  constructor(private validateService: ValidateService, private flashMessage:FlashMessagesService) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    }

    // Required Fields
    if(user.email == undefined || user.email == ""){
      this.flashMessage.show('Please fill in an email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
    if(user.password == undefined || user.password == ""){
      this.flashMessage.show('Please fill in a password', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
  }
}
