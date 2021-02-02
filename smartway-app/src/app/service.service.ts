import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from './Service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getAllServices() : Observable<Service[]>{
    return this.http.get<Service[]>(`https://smartwayserver.herokuapp.com/services`);
  }

  getServiceById(id) : Observable<Service>{
    return this.http.get<Service>(`https://smartwayserver.herokuapp.com/services/${id}`);
  }

  updateServiceById(data, id) : Observable<Service>{
    return this.http.put<any>(`https://smartwayserver.herokuapp.com/services/${id}`, data);
  }
}
