import { Injectable } from '@angular/core';
import { NetworkService } from '../network/network.service';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user-access-management/user';
import { URLConstants } from 'src/app/constants/url-constants';
import { KeywordConstants } from 'src/app/constants/keyword-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser:User;
  sampleuser: any = {  };
  authenticationState = new BehaviorSubject(false);
  constructor(private networkService: NetworkService) { }
  login(userName: string, password: string, success: (any), failure: (any)) {
    
    var requestParams = {
      "UserName": userName,
      "Password": password
    };
    this.networkService.post(URLConstants.UserAccessManagement.LOGIN, requestParams, response => {
      var token = response["Token"];
      token = "Bearer " + token;
      localStorage.setItem(KeywordConstants.Authorization.AUTH_TOKEN_KEY, token)
      localStorage.setItem(KeywordConstants.Authorization.AUTH_STATUS, "TRUE");
      this.authenticationState.next(true);
      success();
    }, error => {
      console.log("Error:" + error);
      localStorage.setItem(KeywordConstants.Authorization.AUTH_STATUS, "FALSE");
      this.authenticationState.next(false);
      failure();
    })


  }
  register(user:User, success: (any), failure: (any)) {
    
    var requestParams = {
      "UserName": user.UserName,
      "Password": user.Password
    };
    this.networkService.post(URLConstants.UserAccessManagement.LOGIN, requestParams, response => {
      var token = response["Token"];
      token = "Bearer " + token;
      localStorage.setItem(KeywordConstants.Authorization.AUTH_TOKEN_KEY, token)
      localStorage.setItem(KeywordConstants.Authorization.AUTH_STATUS, "TRUE");
      this.authenticationState.next(true);
      success();
    }, error => {
      console.log("Error:" + error);
      localStorage.setItem(KeywordConstants.Authorization.AUTH_STATUS, "FALSE");
      this.authenticationState.next(false);
      failure();
    })


  }

  resetPassword(user:User, success: (any), failure: (any)) {
    
    var requestParams = {
      "UserName": user.UserName,
      "Password": user.Password
    };
    this.networkService.post(URLConstants.UserAccessManagement.LOGIN, requestParams, response => {
      var token = response["Token"];
      token = "Bearer " + token;
      localStorage.setItem(KeywordConstants.Authorization.AUTH_TOKEN_KEY, token)
      localStorage.setItem(KeywordConstants.Authorization.AUTH_STATUS, "TRUE");
      this.authenticationState.next(true);
      success();
    }, error => {
      console.log("Error:" + error);
      localStorage.setItem(KeywordConstants.Authorization.AUTH_STATUS, "FALSE");
      this.authenticationState.next(false);
      failure();
    })


  }
  getUseDetails(success: (any)) {
    
    this.networkService.get(URLConstants.UserAccessManagement.PROFILE, response => {
      this.currentUser = new User(response["user_profile"]); 
     
      success(this.currentUser);
    }, () => {
        success(this.sampleuser);
    })
  }
  logout() {
    localStorage.removeItem(KeywordConstants.Authorization.AUTH_TOKEN_KEY);
    localStorage.clear();
    localStorage.setItem(KeywordConstants.Authorization.AUTH_STATUS, "FALSE");
    this.authenticationState.next(false);
  }
  isAuthenticated() {
    
    //  return true;
    var authenticationStatus = localStorage.getItem(KeywordConstants.Authorization.AUTH_STATUS);

    if (authenticationStatus != null && authenticationStatus == "TRUE") {
      return true;
    }
    else {
      return false;
    }


  }
  checkToken() {
    
    var token = localStorage.getItem(KeywordConstants.Authorization.AUTH_TOKEN_KEY);
    return (token) ? true : false;
  }
}
