import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RouteConstants } from 'src/app/constants/route-constants';
import { HeaderService } from './header/HeaderService';
import { AuthorizationService } from 'src/app/services/authorization/authorization.service';
import { User } from 'src/app/models/user-access-management/user';
import { HelperService } from 'src/app/services/helper/helper.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @BlockUI("HomePageLoader") blockHomePageLoaderUI: NgBlockUI;
  @ViewChild('SessionExpiryModal', { static: false }) SessionExpiryModal !: any;
  currentUser: User;
  profileLoaded: Boolean;
  closeResult: string;
  showlinks: boolean = false;
  showprofile: boolean = false;
  canChangePassword: boolean = false;
  loggedInUser = new User(HelperService.EmptyJSON());
  constructor(
    private router: Router,
    private headerService: HeaderService,
    private modalService: NgbModal,
    private authenticationService: AuthenticationService,
    private authorizationService: AuthorizationService) {
    this.authorizationService.currentUser;


  }

  

 
  ngOnInit() {
    
  
  }
  ngAfterViewInit(){
    this.manageSpaces();
  }
  manageSpaces() {
    // var winHeight = $(window).height();
    // var navHeight = $('.header-wrapper').outerHeight();
    // var contentHeight = $('.content-wrapper').outerHeight();
    // if (winHeight > (navHeight + contentHeight)) {
    //   $('.footer-wrapper').addClass('sticky-bottom');
    // } else {
    //   $('.footer-wrapper').removeClass('sticky-bottom');
    // }

    // $('.sidebar-wrapper').css('top', navHeight);

  }



  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if(result == "LoginClick")
      {
        this.expireSession();
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  expireSession() {
   
    this.authenticationService.logout();
    this.loggedInUser = new User(HelperService.EmptyJSON());
    this.router.navigate([RouteConstants.LOGIN]);


  }
}
