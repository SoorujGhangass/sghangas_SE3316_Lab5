import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-my-collections',
  templateUrl: './my-collections.component.html',
  styleUrls: ['./my-collections.component.css']
})
export class MyCollectionsComponent implements OnInit {
  myCollections:Object[];
  user:any;
  editCollection:Object;
  
  
  constructor(private authService:AuthService, private router:Router, private flashMessage:FlashMessagesService) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.authService.getMyCollections(this.user.id).subscribe(myCollections => {
      this.myCollections = myCollections;
      console.log(myCollections);
    },
    err => {
      console.log(err);
      return false;
    });
  }

  
  delete(collection) {
     if (confirm("Are you sure?") == true) {
        var collectionID = collection._id;
        console.log(collection,collectionID);
        this.authService.deleteCollection(collectionID).subscribe(data=>{
          if(data.success){
            this.flashMessage.show('Collection Deleted', {
              cssClass: 'alert-success',
              timeout: 5000});
          } else {
            this.flashMessage.show(data.msg, {
              cssClass: 'alert-danger',
              timeout: 5000});
            // this.router.navigate(['/login']);
          }
        });
     } else {
     }
  }
  
  setEdit(collection){
    this.editCollection = collection;
  }
  
  clear(){
    this.editCollection= null;
  }
  
}
