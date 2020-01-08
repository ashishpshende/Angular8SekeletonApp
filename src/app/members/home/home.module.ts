import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuardService } from 'src/app/services/auth-guard/auth-guard.service';
import { DashboardModule } from './dashboard/dashboard.module';



@NgModule({
  declarations: [HomeComponent],
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
    DashboardModule
  ],
  exports: [
    RouterModule
  ],
})
export class HomeModule { }
