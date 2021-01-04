import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router} from '@angular/router';
import {Visitor} from '../Visitor';

@Component({
  selector: 'app-question-query',
  templateUrl: './question-query.component.html',
  styleUrls: ['./question-query.component.css']
})
export class QuestionQueryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
