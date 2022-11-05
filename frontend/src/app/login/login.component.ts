import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  submitted = false;
  profileForm: FormGroup;
  constructor(
    private router: Router, 
    private auth: AuthService,
    private fb: FormBuilder,
    ) {
      this.profileForm = this.fb.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
      })
     }

  get profileFormControl():any {
      return this.profileForm.controls;

  }   

  onSubmit(): void{
    this.submitted = true;
    if (this.profileForm.valid) {
    this.auth
    .login(this.profileForm.value.username, this.profileForm.value.password)
    .subscribe((response:any)=>{
     localStorage.setItem('token', response.data.token);
     this.router.navigate(['dashboard'])
    },
    error =>{
      this.router.navigate(['login'])
    }
    )
  }
  }

}
