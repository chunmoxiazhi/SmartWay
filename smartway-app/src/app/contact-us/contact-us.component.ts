import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import { Router} from '@angular/router';
import {Visitor} from '../Visitor';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  visitor: Visitor = new Visitor();
  constructor(private user: UserService,  private router: Router) { }

  ngOnInit(): void {
  }

  submitQuestion(q:NgForm){
    this.user.questionResponse(this.visitor).subscribe( () => this.router.navigate(['/home']));
  }

}
