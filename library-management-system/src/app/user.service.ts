import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private jwt: JwtHelperService, private router: Router) {}

  getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/users/register`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/users/login`, credentials);
  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

  deleteToken() {
    localStorage.removeItem("token");
    location.reload();
  }

  navigation() {
    let headers = this.getHeaders();
    let token = this.jwt.decodeToken();
    let user = this.http.get(`${this.baseUrl}/users/${token.id}`, { headers });
    user.subscribe(
      (response: any) => {
        if(response.userType === 'Admin'){
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/client']);
        }
      }
    );
  }

}
