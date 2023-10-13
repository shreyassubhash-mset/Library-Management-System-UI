import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { BookComponent } from './components/book/book.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddComponent } from './components/add/add.component';
import { AuthenticationGuard } from 'src/app/guards/authentication.guard';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full',canActivate: [AuthenticationGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {path: 'book', component: BookComponent, canActivate: [AuthenticationGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard]},
  {path: 'add', component: AddComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
