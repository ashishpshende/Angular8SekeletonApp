import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-access-management/user';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  loggedInUser: User;

  constructor(private router: Router,
   
    private authorizationService: AuthorizationService) {


  }

  ngOnInit() {

  }
  gotoDashboard() {
    this.loggedInUser = new User(HelperService.EmptyJSON());
    this.router.navigate(['home','dashboard']);
  }
  
}
