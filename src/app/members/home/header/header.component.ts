import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-access-management/user';
import { HelperService } from 'src/app/services/helper/helper.service';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { RouteConstants } from 'src/app/constants/route-constants';
import { HeaderService } from './HeaderService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showlinks: boolean = false; 
  isAdmin: boolean = false; 
  showprofile: boolean = false;
  canChangePassword: boolean = false;
  loggedInUser = new User(HelperService.EmptyJSON());
  websiteUrl = environment.apiURL;
  constructor(private authService: AuthenticationService, 
    private router: Router,
    private authorizationService: AuthorizationService,
    private headerService:HeaderService) { 
   
    
  }

  ngOnInit() {
    this.loggedInUser = new User(HelperService.EmptyJSON());  
    this.loggedInUser.Name = "Loading...";
    this.loggedInUser.Account.Name = "Loading...";
    
    this.headerService.loggedInUser.subscribe(param => {
      this.loggedInUser = param;
    });
 
  }
  logout() {
    this.authService.logout();
    this.loggedInUser = new User(HelperService.EmptyJSON());
    this.authorizationService.currentUser = this.loggedInUser;
    this.router.navigate([RouteConstants.LOGIN]);

   
  }


}
