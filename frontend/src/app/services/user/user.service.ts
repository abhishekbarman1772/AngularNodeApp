import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  URL = environment.apiUrl
  
  user(){
    return this.http.get(this.URL + 'api/V1/user',  {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': "Bearer "+ localStorage.getItem('token')

        })
      });
    }
  
}

