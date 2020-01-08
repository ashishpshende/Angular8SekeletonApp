import { Injectable } from '@angular/core';
import { HelperService } from '../helper/helper.service';
import { User } from 'src/app/models/user-access-management/user';
const USER_DETAIL_URL = '/users/info'
const USER_TERMINAL_LISTL_URL = '/masters/terminals/byUser/'
const USER_TERMINAL_LIST = '/masters/terminals'
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  currentUser: User;
  constructor(private networkService: NetworkService) { 
    console.log("AuthorizationService Initialized.")
    this.currentUser = this.getStoredUser();

  }
  
  getUseDetails(success: (any), failure: (any)) {
    this.networkService.get(USER_DETAIL_URL, response => {
      this.currentUser = new User(response);
      this.storeUser(this.currentUser);
      success(this.currentUser);
      if(this.isAdmin())
      {
       
      }
      else
      {

      }


    }, error => {
      this.currentUser = new User(HelperService.EmptyJSON());
      this.currentUser.Id = 0;
      this.currentUser.Name = "OOps, Unable to fetch User Name";
      this.currentUser.Role = new Role(HelperService.EmptyJSON());
      this.currentUser.Role.Name = "OOps, Unable to fetch Role";
      success(this.currentUser);
    })
  }


  whichRole() {
    if (this.currentUser != null && this.currentUser.Roles != null && this.currentUser.Roles.length != 0) {
      var roles = new Array();
      this.currentUser.Roles.forEach(role => {

        return role.Name;

      });
      return "";
    }
    else {
      return "";
    }
  }
  isApprover() {
    return this.hasRole('Approver');
  }
  isOperator() {
    return this.hasRole('Operator');
  }
  isAdmin() {
    return this.hasRole('Admin');
  }
  isComOperator() {
    return this.hasRole('COM-Operator');
  }
  isComApprover() {
    return this.hasRole('COM-Approver');
  }
  hasRole(roleName: String) {
    if (this.currentUser != null && this.currentUser.Role != null) {
      if (this.currentUser.Role.Name == roleName) {
        return true;
      }
      else
        return false;
    }
    else {
      return false;
    }
  }
  hasAccess(roleName: String) {
    if (this.currentUser != null && this.currentUser.Roles != null && this.currentUser.Roles.length != 0) {
      var roles = new Array();
      this.currentUser.Roles.forEach(role => {
        if (role.Name == roleName) {
          return true;
        }
      });
      return false;
    }
    else {
      return false;
    }
  }
  hasAccessFor(roleNames: String[]) {
    if (this.currentUser != null && this.currentUser.Roles != null && this.currentUser.Roles.length != 0) {
      var roles = new Array();
      this.currentUser.Roles.forEach(role => {
        roleNames.forEach(roleName => {
          if (role.Name == roleName) {
            return true;
          }
        });

      });
      return false;
    }
    else {
      return false;
    }
  }

  hasAccessForModule(currentModule: String) {
    if (this.currentUser != null && this.currentUser.Roles != null && this.currentUser.Roles.length != 0) {
      var roles = new Array();
      this.currentUser.Modules.forEach(module => {    
          if (module.Name == currentModule) {
            return true;
          }    
      });
      return false;
    }
    else {
      return false;
    }
  }
  storeUser(user:User)
  {
    localStorage.setItem("USER_ID",user.Id.toString());
    localStorage.setItem("USER_NAME",user.Name.toString());

    if(user.Role != undefined && user.Role != null)
    {
      localStorage.setItem("ROLE_NAME",user.Role.Name.toString());
      localStorage.setItem("ROLE_ID",user.Role.Id.toString());
  
    }
  
   

  }
  getStoredUser()
  {
    var user:User;

    if(localStorage.getItem("USER_ID")!=null)
    {
     
      user = new User(HelperService.EmptyJSON());
      user.Id =parseInt( localStorage.getItem("USER_ID"), 10);
      user.Email = localStorage.getItem("USER_EMAIL");

      user.Role = new Role(HelperService.EmptyJSON());
      user.Role.Id = parseInt( localStorage.getItem("ROLE_ID"), 10);
      user.Role.Name = localStorage.getItem("ROLE_NAME");
      this.currentUser = user;
    }

    return user;
  }
}
