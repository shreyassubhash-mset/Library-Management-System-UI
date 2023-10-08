import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  updateForm: FormGroup;

  profile: any = {};

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.updateForm = this.fb.group({
      firstname: [],
      lastname: [],
      email: [],
      phone: [],
      address: [],
      DOB: [],
    });
  }

  ngOnInit() {
    this.getUserDetails();
  }

  getUserDetails(){
    this.profile = [];
    this.userService.getProfile().subscribe(
      (data: any) => {
        this.profile = data;
        console.log(data);
      },
      (error) => {
        console.error("failed to fetch profile data",error);
      }
    )
  }

  updateUser() {

    const filteredValues: { [key: string]: any } = {};
    Object.keys(this.updateForm.controls).forEach(key => {
      const control = this.updateForm.get(key);
      if (control !== null && control.value !== null && control.value !== '') {
        filteredValues[key] = control.value;
      }
    });

    // Send only the filtered values to the API
    this.userService.updateUser(filteredValues).subscribe(
      (data: any) => {
        console.log("profile updated successfully", data);
        window.location.reload();
      },
      (error) => {
        console.error("Failed to update profile", error);
      }
    );
  }
}
