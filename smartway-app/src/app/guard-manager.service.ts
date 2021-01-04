import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class GuardManagerService {

  constructor(public auth: AuthService, public router: Router) { }

    canActivate(): boolean {
    this.auth.isManager()
    if (this.auth.isManager() == false) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
