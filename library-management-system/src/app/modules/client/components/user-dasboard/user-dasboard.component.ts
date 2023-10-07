import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-dasboard',
  templateUrl: './user-dasboard.component.html',
  styleUrls: ['./user-dasboard.component.css']
})
export class UserDasboardComponent {
  

  name = localStorage.getItem('name');

  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }
  


}
