import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from './Job';
const perPage = "20";
@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getAllJobs(page, service, customer, title, docket, purchase, pCount, cash, startDate, endDate, desc, quote, cover, status): Observable<any> {

    let pageNum = `?page=${page}&perPage=${perPage}`;
    let serviceEnd = '';
    let customerEnd ='';
    let titleEnd = '';
    let docketEnd = '';
    let poEnd ='';
    let pCoundEnd = '';
    let cashEnd ='';
    let startEnd = '';
    let endEnd ='';
    let descEnd ='';
    let quoteEnd = '';
    let coverEnd = '';
    let statusEnd = '';
    if(service != null && service != undefined){
      serviceEnd = `&service=${service}`;
    }
    if (customer != null && customer != undefined){
      customerEnd =`&customer=${customer}`;
    }
    if (title != null && title != undefined){
      titleEnd =`&title=${title}`;
    }
    if (docket != null && docket != undefined && docket != 0){
      docketEnd =`&docket=${docket}`;
    }
    if (purchase != null && purchase != undefined){
      poEnd =`&purchase=${purchase}`;
    }
    if (pCount != null && pCount != undefined&& pCount != 0){
      pCoundEnd =`&pCount=${pCount}`;
    }
    if (cash){
      cashEnd =`&cash=${cash}`;
    }
    if (startDate != null && startDate != undefined){
      startEnd =`&startDate=${startDate}`;
    }
    if (endDate != null && endDate != undefined){
      endEnd =`&endDate=${endDate}`;
    }
    if (desc != null && desc != undefined){
      descEnd =`&desc=${desc}`;
    }

    if (quote != null && quote != undefined){
      quoteEnd =`&quote=${quote}`;
    }

    if (cover != null && cover != undefined){
      coverEnd =`&quote=${cover}`;
    }
    
    if (status != null && status != undefined){
      statusEnd =`&quote=${status}`;
    }

    let ending = pageNum.concat(serviceEnd).concat(customerEnd).concat(titleEnd).concat(docketEnd).concat(poEnd).concat(pCoundEnd).concat(cashEnd).concat(startEnd).concat(endEnd).concat(descEnd).concat(statusEnd);

    return this.http.get<Job[]>(`http://localhost:8080/jobs${ending}`);

  }

  getJobById(id): Observable<Job>{
    return this.http.get<Job>(`http://localhost:8080/jobs/${id}`);
  }

  addNewJob(data: Job):Observable<any>{
    return this.http.post<any>(`http://localhost:8080/jobs`, data);
  }


  updateJobById( data: Job, id: string): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/jobs/${id}`, data);
  }

  deleteJobById(id: string): Observable<any> {
     return this.http.delete<any>(`http://localhost:8080/jobs/${id}`);
  }

}

