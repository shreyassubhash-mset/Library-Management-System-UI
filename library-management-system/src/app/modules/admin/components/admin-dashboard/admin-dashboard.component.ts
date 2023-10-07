import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
 constructor(private userService: UserService) {}

 name = localStorage.getItem('name');

 logout() {
  localStorage.removeItem('name');
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
}

}
