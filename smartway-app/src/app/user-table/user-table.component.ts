import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../User';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, OnDestroy {
  adminArray: Array<User> = [];
  private admins;

  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
    this.admins = this.user.getAllUsers().subscribe(data => this.adminArray = data);
  }

  ngOnDestroy() {
    if (this.admins) this.admins.unsubscribe();
  }

  rowClicked(e, id) {
    this.router.navigate(['/manager', id]);
  }

}
