import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router} from '@angular/router';
import { User } from '../User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  newUser: User = new User();

  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  addNewUser(validU: NgForm): void {
    this.user.registerUser(this.newUser).subscribe( () => this.router.navigate(['/jobs']));
  }

}
