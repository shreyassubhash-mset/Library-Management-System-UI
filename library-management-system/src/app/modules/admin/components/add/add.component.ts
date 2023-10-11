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
      title: [''],
      description: [''],
      author: [''],
      category: [''],
      image: [''], // Define it as a string initially
    });
  }

  onFileSelected(event: any) {
    // Handle the file input change event
    const file = event.target.files[0];
    this.bookForm.get('image')?.setValue(file);
  }

  addBook() {
    // Access the image file from the form
    const imageFile = this.bookForm.get('image')?.value;
    const formData = new FormData();

    // Append the image file to the FormData
    if (imageFile) {
      formData.append('image', imageFile);
    }

    // Append other form fields as needed
    formData.append('title', this.bookForm.get('title')?.value);
    formData.append('description', this.bookForm.get('description')?.value);
    formData.append('author', this.bookForm.get('author')?.value);
    formData.append('category', this.bookForm.get('category')?.value);

    // Send formData to your API using UserService
    this.userService.addBook(formData).subscribe(
      (data: any) => {
        console.log("Book added successfully", data);
        window.location.reload();
      },
      (error) => {
        console.error("Failed to add book", error);
      }
    );
  }
}
