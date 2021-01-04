import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
import { User } from '../User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:User;
  public warning:string;

  constructor(private auth:AuthService, private router:Router) {

   }


  ngOnInit(): void {
    this.user = new User();
  }

  
  loginSubmit(validLogin:NgForm): void{
    this.auth.loginUser(this.user).subscribe(
      (success) => {
        // store the returned token in local storage as 'access_token'
        localStorage.setItem('access_token',success.token);
        // redirect to the "vehicles" route
        this.router.navigate(['/jobs']);
      },
      (err) => {
        this.warning = `Invalid email and/or password.`;
      }
    );

  }
}


