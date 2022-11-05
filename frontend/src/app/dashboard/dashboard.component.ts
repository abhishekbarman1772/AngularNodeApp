import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public loggedUser:any

  constructor(
    private router: Router, 
    private auth: AuthService,
    private user: UserService,
    ) { }

  ngOnInit(): void {
      this.user
      .user()
      .subscribe((response:any)=>{
        this.loggedUser = response.data.user
      })
  }
  logout(): void { 
    this.auth
    .logout()
    .subscribe(()=>{
      localStorage.removeItem('token');
      document.cookie = document.cookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      this.router.navigate(['login'])
     },
     error =>{
      this.router.navigate(['dashboard'])
     })
  }

}
