import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { isArray } from 'util';
import {Service} from '../Service';
import {ServiceService} from '../service.service';

function removeIdentical(servicesArray, id){
  if(Array.isArray(servicesArray)){
    return servicesArray.filter(service=> service._id != id);
  }
  
}

@Component({
  selector: 'app-relevant-services',
  templateUrl: './relevant-services.component.html',
  styleUrls: ['./relevant-services.component.css']
})



export class RelevantServicesComponent implements OnInit {

  @Input() services: Array<Service>;
  private currentId: any;
  relevantServices: any;


  constructor(private data:ServiceService, private route: ActivatedRoute) {

   }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.currentId = params['id'];
    })
    this.relevantServices = this.data.getAllServices().subscribe(results => this.services = removeIdentical(results, this.currentId));

  }

}
