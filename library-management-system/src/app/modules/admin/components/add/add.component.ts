import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  bookForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      title: [],
      description: [],
      author: [],
      category: [],
    });
  }

  addBook() {
    this.userService.addBook(this.bookForm.value).subscribe(
      (data: any) => {
        console.log("Book added successfully", data);
      }, (error) => {
        console.error("Failed to add book", error);
      }
    );
  } 

}
