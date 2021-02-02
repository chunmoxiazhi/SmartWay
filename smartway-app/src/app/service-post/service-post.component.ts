import { Component, OnInit, Input  } from '@angular/core';
import { Service } from '../Service';

@Component({
  selector: 'app-service-post',
  templateUrl: './service-post.component.html',
  styleUrls: ['./service-post.component.css']
})
export class ServicePostComponent implements OnInit {

  @Input() currentService: Service;

  constructor() { }

  ngOnInit(): void {
  }

}
