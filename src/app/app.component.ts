import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication/authentication.service';
import { RouteConstants } from './constants/route-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SkeletonApp';
  constructor( private router:Router,
    private authenticationService:AuthenticationService) { 
      this.initializeApp();
    }

  initializeApp() {
    if(this.authenticationService.isAuthenticated())
    {

      var CurrentStateURL = window.location.href;
      CurrentStateURL = CurrentStateURL.split('#')[1];
      console.log(window.location.href);
      if(CurrentStateURL != null && CurrentStateURL != "")
      this.router.navigateByUrl(CurrentStateURL);
      else
       this.router.navigate([RouteConstants.HOME]);
     
    }
    else 
    {
      // this.router.navigate(['adfs-login']);
          this.router.navigate([RouteConstants.LOGIN]);
    }
  }
}
