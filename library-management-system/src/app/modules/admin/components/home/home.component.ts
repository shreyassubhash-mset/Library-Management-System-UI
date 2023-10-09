import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  books: any[] = [];
  available: any[] = [];
  borrowed: any[] = [];
  displayedBooks: any[] = [];
  itemsPerPage: number = 3; 
  currentPage: number = 1;
  totalPages: number = 1;
  constructor(private userService: UserService) {}

  ngOnInit() {
    // Fetch all books when the component initializes
    this.fetchBooks();
  }

  fetchBooks() {
    this.books = [];
    this.userService.getBooks().subscribe(

      (data: any) => {
        this.books = data;
        this.available = data.filter((item: any) => item.status === "Available");
        this.borrowed = data.filter((item: any) => item.status === "Not available");
        this.totalPages = Math.ceil(this.books.length / this.itemsPerPage);
        this.updateDisplayedBooks();
      },
      (error) => {
        console.error("Error fetching books", error);
      }
    );
  }

  updateDisplayedBooks() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedBooks = this.books.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedBooks();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedBooks();
    }
  }


  deleteBook(bookId: string){
    this.userService.deleteBooks(bookId).subscribe(
      (data: any) => {
        console.log("Book deleted successfully", data);
        window.location.reload();
      }, (error) => {
        console.error("Failed to delete the book", error);
      }
    );
  }
}
