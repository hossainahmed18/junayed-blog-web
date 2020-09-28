import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { baseUrl } from './links'
import { decode as atob, encode as btoa } from 'base-64'

@Injectable()
export class AuthService {
  url = '';


  constructor(private http: HttpClient,
    private _router: Router) {
    this.url = baseUrl;
  }

  registerUser(user) {
    return this.http.post<any>(this.url + 'user/register', user)
  }

  loginUser(user) {
    return this.http.post<any>(this.url, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/posts'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  loggedInUser() {
    let token = localStorage.getItem('token')
    if (token == null) {
      return false;
    } else {
      return true;
    }
  }

  loggedInAdmin() {
    let token = localStorage.getItem('token')
    if (token !== null) {
      let userData = this.parseJwt(token)
      if (userData.role == "admin") {
        if(userData.exp > (new Date().getTime()/1000)){
          return true;
        }
        
      }
    }
    return false;
  }

  getUserData() {
    let token = localStorage.getItem('token')
    if (token != null) {
      if (this.parseJwt(token).exp < (new Date().getTime() / 1000)) {
        return this.parseJwt(token)
      } else {
        return null;
      }
    } else {
      return null;
    }

  }

  parseJwt(token) {

    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }


}