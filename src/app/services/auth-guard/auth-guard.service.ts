import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private authenticationService:AuthenticationService,
    private router: Router) {
  }

  canActivate(
    
      route: ActivatedRouteSnapshot, 
      state: RouterStateSnapshot) {
        return true;
        if(this.authenticationService.isAuthenticated())
        {
          return true;
        }
        else
          return false;
       

       
       
           
          
  }
}