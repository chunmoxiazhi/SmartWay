import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { LoginUser } from './LoginUser';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/manager/registration`, user);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/manager`);
  }

  getUserById(id): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/manager/${id}`);
  }

  updateUserById(data, id): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/manager/${id}`, data);
  }

  deleteUserById(id): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/manager/${id}`);
  }
  //Login
  // loginUser(data: LoginUser): Observable<any> {
  //   return this.http.post<any>(`http://localhost:8080/login`, data);
  // }


}
