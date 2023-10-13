import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDasboardComponent } from './components/user-dasboard/user-dasboard.component';
import { HomeComponent } from './components/home/home.component';
import { BorrowComponent } from './components/borrow/borrow.component';
import { HistoryComponent } from './components/history/history.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthenticationGuard } from 'src/app/guards/authentication.guard';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full', canActivate: [AuthenticationGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path:'book', component: BorrowComponent, canActivate: [AuthenticationGuard]},
  {path:'history', component:HistoryComponent, canActivate: [AuthenticationGuard]},
  {path: 'profile', component:ProfileComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
