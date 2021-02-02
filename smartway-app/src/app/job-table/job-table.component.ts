import { Component, OnInit, OnDestroy  } from '@angular/core';
import { JobService } from '../job.service';
import { Router } from '@angular/router';
import { Job } from '../Job';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.css']
})
export class JobTableComponent implements OnInit, OnDestroy {
  jobs: Array<Job>;

  
  page: Number = 1;
  service: String = null;
  customer: String = null;
  title: String = null;
  docket: Number = 0;
  purchase: String = null;
  pCount: Number = 0;
  cash: Boolean = false;
  startDate: String = null;
  endDate: String = null;
  desc: String = null;
  quote: String = null;
  cover: Boolean = false;
  status: String = null;

  querySub: any;

  constructor(private data: JobService, private route: ActivatedRoute, private router: Router) { }

  getPage(num) {
    this.querySub = this.data.getAllJobs(num, this.service, this.customer, this.title, this.docket, this.purchase, this.pCount, this.cash, this.startDate, this.endDate, this.desc, this.quote, this.cover, this.status).subscribe(data => {
      if (data.length > 0) {
        console.log(typeof data);
        console.log(data);
        this.jobs = data, this.page = num;
        console.log(typeof this.jobs)
      }
    });
  }

  ngOnInit(): void {

    this.querySub = this.route.queryParams.subscribe(params => {
      
      if(params['service'])
      this.service = params['service'];
     
      if(params['customer'])
      this.customer = params['customer'];

      if(params['title'])
      this.title = params['title'];

      if(params['docket'])
      this.docket = params['docket'];

      if(params['purchase'])
      this.purchase = params['purchase'];

      if(params['pCount'])
      this.pCount = params['pCount'];

      if(params['cash'])
      this.cash = params['cash'];

      if(params['startDate'])
      this.startDate = params['startDate'];

      if(params['endDate'])
      this.endDate = params['endDate'];
      
      if(params['desc'])
      this.desc = params['desc'];

      if(params['status'])
      this.status = params['status'];

      
      if(params['cover'])
      this.cover = params['cover'];

      if(params['quote'])
      this.quote = params['quote'];
  
      this.getPage(+params['page'] || 1);
     });
  }

  rowClicked(e, id) {
    this.router.navigate(['/jobs', id]);
  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }

}
