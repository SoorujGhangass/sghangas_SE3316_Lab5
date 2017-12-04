import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }
  
  ngOnInit() {
    
    var token_id_paramater = this.router.parseUrl(this.router.url).queryParams['token'];
    console.log(token_id_paramater);
    const token = {
      token: token_id_paramater
    }
    console.log(JSON.stringify(token));
    this.authService.confirmEmail(token).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Your email is now verified. Please log in.', {
          cssClass: 'alert-success',
          timeout: 5000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
        // this.router.navigate(['/login']);
      }
    });
    
  }

}
