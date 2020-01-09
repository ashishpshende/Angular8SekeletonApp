import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-access-management/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helper/helper.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public frontendValidation:boolean;
  public backendValidation: boolean;
  public user:User;
  public loginInProcess:boolean;
  public submitButtonTitle:String = "Login";
  constructor(private authenticationService: AuthenticationService, 
    
    private router:Router) {
    this.frontendValidation = true;
    this.backendValidation = true;
    this.loginInProcess = false;
    this.user = new User(HelperService.EmptyJSON());

   
    
   

    //Account 1 - User 1
    this.user.Name = "Robert Jorden";
    this.user.Email = "robertj@gmail.com";
    this.user.UserName = "robertj@gmail.com";
    this.user.Password = "Password";  // LDAP
    this.user.ConfirmPassword = "Password";

   //Account 1 - User 1
  //  this.user.UserName = "PLaurent@gmail.com";
  //  this.user.Password = "Password";  // LDAP
  

   }

  ngOnInit() {   

  }
  validate() {
    if (this.user.UserName == null || this.user.UserName == '' || this.user.Password == null || this.user.Password == '')
    {
      this.frontendValidation = false;
    }
    else
    {
      this.frontendValidation = true;
    }


  }
  login()
  {
   
   this.backendValidation = true;
    this.validate();
 
     if(this.frontendValidation)
     {
          this.loginInProcess = true;
          this.submitButtonTitle = "Logging in..."
          this.authenticationService.login(this.user.UserName,this.user.Password,response=>{
            this.submitButtonTitle = "Login"
            this.backendValidation=true;
            this.loginInProcess = false;
            this.router.navigate(['home']);
          },
          failure=>{
            this.backendValidation = false;
            this.submitButtonTitle = "Login"
            this.loginInProcess = false;
        });
     }
     else
     {
      this.frontendValidation = false;
     }
       
    
      
  }

  LogInLinkClicked()
  {
    this.router.navigate(['login']);
  }

}
