import { Injectable } from '@angular/core';
import {Http, Headers, HttpModule} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

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
  
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('/api/user/authenticate', user,{headers: headers})
      .map(res => res.json());
  }
  
  getMyCollections(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('/api/user/my-collections',{headers: headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }
  
  //Token is related to email verification. Not authorization.
  confirmEmail(token){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('/api/user/confirmation', token,{headers: headers})
      .map(res => res.json());
  }
  
  resendEmail(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('/api/user/resend', user,{headers: headers})
      .map(res => res.json());
  }
  
  loadToken(){
    var token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
