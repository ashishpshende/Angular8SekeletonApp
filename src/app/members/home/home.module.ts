import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuardService } from 'src/app/services/auth-guard/auth-guard.service';
import { HeaderComponent } from './header/header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FooterModule } from './footer/footer.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderModule } from './header/header.module';
import { SideMenuModule } from './side-menu/side-menu.module';



@NgModule({
  declarations: [HomeComponent,
    HeaderComponent,
    FooterComponent,
    SideMenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "", component: HomeComponent,canActivate: [AuthGuardService],
        children: [
          {
            path: '', redirectTo: 'dashboard',canActivate: [AuthGuardService],
            data: {},
            pathMatch: 'full'
          },
          {
            path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',canActivate: [AuthGuardService],
            data: {}
          }
         
         
      ]
      }]),
      HeaderModule,
      FooterModule,
      SideMenuModule,
  
  ],
  exports: [
    RouterModule
  ],
})
export class HomeModule { }
