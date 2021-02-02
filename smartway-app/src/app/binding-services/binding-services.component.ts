import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Service} from '../Service';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-binding-services',
  templateUrl: './binding-services.component.html',
  styleUrls: ['./binding-services.component.css']
})
export class BindingServicesComponent implements OnInit {

  availableServices: Array<Service> = [];
  private service

  constructor(private data: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.service = this.data.getAllServices().subscribe(results=>{
      if(results.hasOwnProperty ){
         this.availableServices = results;
      }
    });
  }

  ngOnDestroy() {
    if (this.service) this.service.unsubscribe();
  }

}
