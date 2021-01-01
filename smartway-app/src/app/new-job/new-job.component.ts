import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { Router} from '@angular/router';
import { Job } from '../Job';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-job',
  templateUrl: './new-job.component.html',
  styleUrls: ['./new-job.component.css']
})
export class NewJobComponent implements OnInit {
  newJob: Job = new Job();
  servicez:any;

  // private job;
  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
  }
  constructor(private data: JobService, private router: Router) { }

  ngOnInit(): void {
    this.newJob.status = "Job Created"
  }

  addNewJob(validNew: NgForm):void{
    console.log("Submit");
    console.log(validNew.form.value);

    if(this.newJob.isCash == undefined){
      this.newJob.isCash = false;
    }
    if(this.newJob.PONumber == undefined){
      this.newJob.PONumber = "00000000";
    }
    if(this.newJob.cover == undefined){
      this.newJob.cover = false;
    }
    if(this.newJob.description == undefined){
      this.newJob.description = "";
    }
      

    

    let servicesString = this.servicez.toString();
    this.newJob.services = servicesString.split(',').map(service => service.trim());
    this.newJob.postDate = new Date();
    this.data.addNewJob(this.newJob).subscribe( () => this.router.navigate(['/jobs']));

  }

}
