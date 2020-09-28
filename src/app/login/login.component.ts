import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from './login-service.service';
import { Router } from '@angular/router'


 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registration = false
  email: ''
  password = ""
  userName = ""
  userRole = "user"

  constructor(private loginServiceService: LoginServiceService, private router: Router) { }

  ngOnInit() {
      console.log(this.router.url)
    
  }
  changeOption(option) {
    if (option == "registration") {
      this.registration = true;
    } else {
      this.registration = false;
    }

  }
  login() {
    
    
    this.loginServiceService.login({ email: this.email, password: this.password }).subscribe((data: any) => {

      if(this.router.url=="/admin/login"){
         this.router.navigate(['/posts'])
      }
    })
    
  }
  register() {
    this.loginServiceService.login({ email: this.email, password: this.password, userName: this.userName, userRole: 'user' }).subscribe((data: any) => {
      this.registration = false;
    })
  }

}
