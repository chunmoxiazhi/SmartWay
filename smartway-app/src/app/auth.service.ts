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
    const token = this.getToken();
    // let read = this.readToken();
    // console.log(read);

    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  isManager(): boolean{
    let decodeToken = this.readToken();
    return decodeToken.manager ? true : false;
  }
  loginUser(user: User): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/login`, user);
  }

}
