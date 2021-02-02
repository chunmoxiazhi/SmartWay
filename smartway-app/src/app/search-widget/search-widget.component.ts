import { Component, OnInit } from '@angular/core';
import {Service} from '../Service';
import {ServiceService} from'../service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {BindingServicesComponent} from '../binding-services/binding-services.component';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.css']
})
export class SearchWidgetComponent implements OnInit {
  services: Array<Service>;
  searchResults: Array<Service>;
  public keyword: any;
  warning: string;
  notFound: string;

  constructor(private data: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.data.getAllServices().subscribe(results=> this.services = results);
  }

  search(validSearch: NgForm): void{
    if(this.keyword == null || this.keyword.length == 0){
      this.warning = `Invalid: please enter a keyword.`;
    }
    else{
      this.searchResults = [];
      this.services = this.services.filter(service=>{
        if( service.serviceName.toLocaleLowerCase().includes(this.keyword.toLocaleLowerCase())){
          this.searchResults.push(service);
         
        }
        else if (service.serviceDescription.toLocaleLowerCase().includes(this.keyword.toLocaleLowerCase())){
           this.searchResults.push(service);
        }

      })
    }

    if(this.searchResults.length == 0){
      this.searchResults = null;
      this.notFound = `Seems like we currently do not have any related service.`

    }
  }

}
