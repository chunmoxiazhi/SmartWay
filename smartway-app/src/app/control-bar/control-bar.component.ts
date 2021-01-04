import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {JobService} from '../job.service'
import { Job } from '../Job';
import { NgForm } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent implements OnInit, OnDestroy {
  // @Input() page;
  // @Output() searchResults = new EventEmitter();
  page: Number = 1;
  service: String;
  customer: String;
  title: String;
  docket: Number;
  purchase: String;
  pCount: Number;
  cash: Boolean;
  startDate: Date;
  endDate: Date;
  desc: String;
  quote: String;
  cover: Boolean;
  status: String;


  // jobs: Array<Job>;
  querySub: any;


  constructor(private data: JobService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  
  parseDate(dateString: Date): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
  }
  searchJobs(search: NgForm){
    let sDate, eDate;
    if(this.startDate){
       sDate = this.startDate.toString();
    }
    if(this.endDate){
       eDate = this.endDate.toString();
    }
  
    this.querySub = this.data.getAllJobs(1, this.service, this.customer, this.title, this.docket, this.purchase, this.pCount, this.cash, sDate,eDate, this.desc, this.quote, this.cover, this.status)
    .subscribe(data => {
      if (data.length > 0){
        this.router.navigate(['/jobs'], { queryParams: { service: this.service, customer:this.customer,  title:this.title, docket: this.docket, purchase: this.purchase, pCount: this.pCount, cash: this.cash, startDate: sDate, endDate: eDate, desc:this.desc, quote:this.quote, cover: this.cover, status:this.status} });

      }
      else{
        this.router.navigate(['/page-not-found']);
      }

    });
    

  }

  ngOnDestroy() {

    console.log("Control bar");
    if (this.querySub) this.querySub.unsubscribe();
  }


}
