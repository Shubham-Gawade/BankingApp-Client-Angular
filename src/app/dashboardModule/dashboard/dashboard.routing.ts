import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from '../account-details/account-details.component';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { FundTransferComponent } from '../fund-transfer/fund-transfer.component';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';

const dashboardRoutes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'account-details', component: AccountDetailsComponent },
  { path: 'create-account', component:CreateAccountComponent },
  { path: 'fund-transfer', component: FundTransferComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRouting { }