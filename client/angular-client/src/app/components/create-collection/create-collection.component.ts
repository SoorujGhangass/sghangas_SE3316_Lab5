import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.component.html',
  styleUrls: ['./create-collection.component.css']
})
export class CreateCollectionComponent implements OnInit {
  collectionName: String;
  description: String;
  public: Boolean;
  isPrivate: Boolean;
  
  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessage:FlashMessagesService) { }
  
  ngOnInit() {
    
  }
  
  create(){
    if(this.public){this.isPrivate = false;}
    else{this.isPrivate = true;}
    const collection = {
      name: this.collectionName,
      description: this.description,
      isPrivate: this.isPrivate,
      ownerID: JSON.parse(localStorage.getItem('user')).id
    }
    console.log(collection);
    
    this.authService.createCollection(collection).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Collection Created', {
          cssClass: 'alert-success',
          timeout: 5000});
        this.router.navigate(['/my-collections']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 5000});
        // this.router.navigate(['/login']);
      }
    });
  }

}
