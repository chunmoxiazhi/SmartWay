import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import {User} from './User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }
  public readToken(): any{
    const token = localStorage.getItem('access_token');
    return helper.decodeToken(token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');

    // Note: We can also use this.jwtHelper.isTokenExpired(token) 
    // to see if the token is expired

    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }
  loginUser(user: User): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/login`, user);
  }
  // logoutUser(): void {
  //   localStorage.setItem('isLoggedIn','false');    
  //   localStorage.removeItem('token'); 
  // }


  // login(user: User): Observable<any> {
  //   // Attempt to login
  //   return this.http.post<any>('http://localhost:8080/api/login', user);
  // }
}
