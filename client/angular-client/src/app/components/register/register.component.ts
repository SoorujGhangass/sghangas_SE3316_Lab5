import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  email: String;
  hashedPassword: String;
  
  constructor(private validateService: ValidateService, private flashMessage:FlashMessagesService, private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const user = {
      name: this.name,
      email: this.email,
      hashedPassword: this.hashedPassword
    }
    // Required Fields
    if(user.email == undefined || user.email == ""){
      this.flashMessage.show('Please fill in an email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
    if(user.hashedPassword == undefined || user.hashedPassword == ""){
      this.flashMessage.show('Please fill in a password', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are now registered. Please verify your email address by clicking the link that was sent to you.', {cssClass: 'alert-success', timeout: 8000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }
}
