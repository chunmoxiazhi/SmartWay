import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Service} from '../Service';
import { ServiceService} from '../service.service';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  @Input() service: Service;
  private querySub: any;
  reviewAuthor: string;
  reviewContent: string;
  public warning: string;

  constructor(private data: ServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params =>{
      this.data.getServiceById(params['id']).subscribe(res=>{
        this.service = res;
        this.service.serviceViews++;
        this.data.updateServiceById(this.service, this.service._id).subscribe();
      })
    })
  }

  reviewSubmit(validR: NgForm): void{

    
    if(this.reviewContent == null || this.reviewContent.length == 0){
      this.warning = 'Invalid review. Please leave us your thoughts.';
    }
    else{

      this.reviewAuthor = this.reviewAuthor != null? this.reviewAuthor : "Annoymous";
      this.service.serviceReviews.push({ 
        author: this.reviewAuthor,
        comment: this.reviewContent,
        date: new Date()
      });
      this.warning = null;

    }
    this.data.updateServiceById(this.service, this.service._id).subscribe(()=>{
      this.reviewAuthor = '';
      this.reviewContent = '';
    })

  }

  ngOnDestroy() {
    if (this.querySub) this.querySub.unsubscribe();
  }

}
