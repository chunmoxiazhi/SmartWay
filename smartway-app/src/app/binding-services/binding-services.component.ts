import { Component, OnInit } from '@angular/core';
import {Service} from '../Service';
import serviceInfo from '../serviceInfo.json';

@Component({
  selector: 'app-binding-services',
  templateUrl: './binding-services.component.html',
  styleUrls: ['./binding-services.component.css']
})
export class BindingServicesComponent implements OnInit {

  availableServices: Array<Service> = serviceInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
