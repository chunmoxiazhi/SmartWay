import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BindingServicesComponent } from './binding-services/binding-services.component';
import { JobTableComponent } from './job-table/job-table.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { NewJobComponent } from './new-job/new-job.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent} from './register/register.component';
import { UserTableComponent} from './user-table/user-table.component';
import { EditUserComponent} from './edit-user/edit-user.component';

import { GuardAuthService } from './guard-auth.service';
// http://localhost:4200/manager/registration

const routes: Routes = [
  { path: "home", component: HomeComponent},
  { path: "login", component: LoginComponent},
  { path: "services", component: BindingServicesComponent},
  { path: "jobs", component: JobTableComponent, canActivate: [GuardAuthService]},
  { path: 'jobs/newJob', component: NewJobComponent, canActivate: [GuardAuthService] },
  { path: 'jobs/:id', component: EditJobComponent, canActivate: [GuardAuthService] },
  { path: 'manager/registration', component: RegisterComponent, canActivate: [GuardAuthService] },
  { path: 'manager/:id', component: EditUserComponent, canActivate: [GuardAuthService] },
  
  { path: 'manager', component: UserTableComponent, canActivate: [GuardAuthService] },




  { path: "**", component: PageNotFoundComponent},
  {path: "", redirectTo: "/home", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
