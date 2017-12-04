import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
  
  validateRegister(user){
    if(user.name == undefined || user.email == undefined || user.password == undefined || user.name == "" || user.email == "" || user.password == ""){
      return false;
    } else {
      return true;
    }
  }
    //Source: https://stackoverflow.com/questions/46155/how-to-validate-email-address-in-javascript
  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
