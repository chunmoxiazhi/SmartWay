import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { BindingServicesComponent } from './binding-services/binding-services.component';
import { SearchWidgetComponent } from './search-widget/search-widget.component';
import { ServicePostComponent } from './service-post/service-post.component';
import { PagingComponent } from './paging/paging.component';
import { JobTableComponent } from './job-table/job-table.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { NewJobComponent } from './new-job/new-job.component';
import { ControlBarComponent } from './control-bar/control-bar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { InterceptTokenService } from './intercept-token.service';
import { RegisterComponent } from './register/register.component';
import { UserTableComponent } from './user-table/user-table.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    BindingServicesComponent,
    SearchWidgetComponent,
    ServicePostComponent,
    PagingComponent,
    JobTableComponent,
    EditJobComponent,
    NewJobComponent,
    ControlBarComponent,
    PageNotFoundComponent,
    RegisterComponent,
    UserTableComponent,
    EditUserComponent,
    ContactUsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptTokenService,
    multi: true
  }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
