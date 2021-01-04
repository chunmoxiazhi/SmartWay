import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { LoginUser } from './LoginUser';
import { User } from './User';
import { Visitor } from './Visitor';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    return this.http.post<any>(`https://smartwayserver.herokuapp.com/manager/registration`, user);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`https://smartwayserver.herokuapp.com/manager`);
  }

  getUserById(id): Observable<any> {
    return this.http.get<any>(`https://smartwayserver.herokuapp.com/manager/${id}`);
  }

  updateUserById(data, id): Observable<any> {
    return this.http.put<any>(`https://smartwayserver.herokuapp.com/manager/${id}`, data);
  }

  deleteUserById(id): Observable<any> {
    return this.http.delete<any>(`https://smartwayserver.herokuapp.com/manager/${id}`);
  }
  questionResponse(visitor: Visitor):Observable<any> {
  return this.http.post<any>(`https://smartwayserver.herokuapp.com/question`, visitor);
  }

}
