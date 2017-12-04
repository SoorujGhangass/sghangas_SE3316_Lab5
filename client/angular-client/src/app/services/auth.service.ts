import { Injectable } from '@angular/core';
import {Http, Headers, HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    authToken:any;
    user:any;
    
  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('/api/user', user,{headers: headers})
      .map(res => res.json());
  }
}
