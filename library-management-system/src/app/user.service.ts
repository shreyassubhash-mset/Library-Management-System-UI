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
        localStorage.setItem('name',response.username);
        localStorage.setItem('userId',response._id);
        if(response.userType === 'Admin'){
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/client']);
        }
      }
    );
  }

  getUserDetails() {
    let headers = this.getHeaders();
    let token = this.jwt.decodeToken();
    let user = this.http.get(`${this.baseUrl}/users/${token.id}`, { headers });
    user.subscribe(
      (response: any) => {
        let name = response.username;
        return name;
      }
    );
  }

  getBooks() {
    let headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/books`, { headers } );
  }
  searchBook(keyword: string) {
    let headers = this.getHeaders();
    const query = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
    return this.http.get(`${this.baseUrl}/books/search${query}`, { headers });
  }

  borrowBook(bookId: string) {
    let headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/transaction/borrow/${localStorage.getItem('userId')}/${bookId}`, { headers });
  }

  getBorrowedBooks() {
    let headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/transaction/history/${localStorage.getItem('userId')}`, { headers });
  }

  returnBook(borrowId: string) {
    let headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/transaction/return/${borrowId}`, { headers });
  }

  deleteBooks(bookId: string) {
    let headers = this.getHeaders();
    return this.http.delete(`${this.baseUrl}/${bookId}`, { headers });

  }

}
