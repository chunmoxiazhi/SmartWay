import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { Service } from '../Service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  @Input() searchResults: Array<Service>;
  private currentId: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params =>{
      this.currentId = params['id'];
    })
    // this.relevantServices = this.data.getAllServices().subscribe(results => this.services = removeIdentical(results, this.currentId));
  }

}
