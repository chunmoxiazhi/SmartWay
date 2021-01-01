import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Job } from '../Job';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css']
})
export class EditJobComponent implements OnInit {
  editableJob: Job;
  services:any;

  private job;
  constructor(private data: JobService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log(2212);
    this.job = this.data.getJobById(this.route.snapshot.params['id']).subscribe(data => {
      this.editableJob = data; 
      this.services = data.services.toString();
    })
  }

  parseDate(dateString: string): Date {
    if (dateString) {
        return new Date(dateString);
    }
    return null;
  }

  submitUpdateJob(validEdit: NgForm): void {
    this.editableJob.services = this.services.split(',').map(service => service.trim());
    this.data.updateJobById(this.editableJob, this.editableJob._id).subscribe( () => this.router.navigate(['/jobs']));
  }

  deleteJob(id) {
    this.data.deleteJobById(id).subscribe( () => this.router.navigate(['/jobs']));
  }

  ngOnDestroy() {
    if (this.job) this.job.unsubscribe();
  }

}
