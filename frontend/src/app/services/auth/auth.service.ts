import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = environment.apiUrl

  constructor(private http: HttpClient) { }
  
  login(email: string, password: string){
    return this.http.post(this.URL + 'api/V1/auth/login', { email, password },  {
      withCredentials: true
    });
  }
  
  logout(){
    return this.http.post(this.URL + 'api/V1/auth/logout', {},
    {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer "+ localStorage.getItem('token')
        })
    });
  }
}
