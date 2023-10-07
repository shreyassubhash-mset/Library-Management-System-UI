import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  borrows: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getBorrowedBooks();
  }

  getBorrowedBooks() {
    this.borrows = [];
    this.userService.getBorrowedBooks().subscribe(
        (data: any) => {
          this.borrows = data.filter((item: any) => item.status === 'Borrowed');
          console.log(data);
        },
        (error) => {
          console.error("Error fetching borrowed books", error);
        }
    );
  }

  returnBook(borrowId: string) {
    this.userService.returnBook(borrowId).subscribe(
      (data: any) => {
        console.log("Book returned Successfully", data);
        window.location.reload();
      }, (error) => {
        console.error('Error returning book', error);
      }
    );
  }

}

