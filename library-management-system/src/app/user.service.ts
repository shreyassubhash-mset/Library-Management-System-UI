import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.baseUrl}/users/register`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/users/login`, credentials);
  }
}
