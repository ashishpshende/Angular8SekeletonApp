import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './public/login/login.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AuthorizationService } from './services/authorization/authorization.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderService } from './members/home/header/HeaderService';
import { SignUpComponent } from './public/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './public/forgot-password/forgot-password.component';
import { ForgotPasswordModule } from './public/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './public/reset-password/reset-password.module';
import { SignUpModule } from './public/sign-up/sign-up.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ForgotPasswordComponent   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: '', redirectTo:'home', pathMatch:'full' },
      { path: 'home', loadChildren: './members/home/home.module#HomeModule', canActivate: [AuthGuardService] },
      { path: 'login', component: LoginComponent },
      { path: 'sign-up',  component:SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },

      
    ], { useHash: true, onSameUrlNavigation: 'ignore' }, ),
    ForgotPasswordModule,
    ResetPasswordModule,
    SignUpModule,
    
  ],
  providers: [
    AuthenticationService ,
    AuthorizationService,
    AuthGuardService,
    HeaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
