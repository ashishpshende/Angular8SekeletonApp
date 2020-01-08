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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent   
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
      
    ], { useHash: true, onSameUrlNavigation: 'ignore' }, ),
    
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
