import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from '../User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editableUser: User;
  constructor(private user: UserService, private route: ActivatedRoute, private router: Router) { }
  private admin;
  ngOnInit(): void {
    this.admin = this.user.getUserById(this.route.snapshot.params['id']).subscribe(data => {
      this.editableUser = data; 
      // this.tagz = data.tags.toString();
    })
  }

  userSubmit(validU: NgForm): void {
    this.user.updateUserById(this.editableUser._id, this.editableUser).subscribe( () => this.router.navigate(['/manager']));
  }

  deleteUser(id) {
    this.user.deleteUserById(id).subscribe( () => this.router.navigate(['/manager']));
  }

  ngOnDestroy() {
    if (this.admin) this.admin.unsubscribe();
  }


}
