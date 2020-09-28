import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from '../links'

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {


  apiURL: string;
  constructor(private http: HttpClient
    ) {
    this.apiURL = baseUrl
    
  }


  login(data){  
    return this.http.post(this.apiURL + '/user/login',data);      
  }
  register(data){  
    return this.http.post(this.apiURL + '/user/register',data);      
  }
}
