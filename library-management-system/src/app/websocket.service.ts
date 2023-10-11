// socket.service.ts
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  constructor(private socket: Socket) {}

  connect() {
    try {
      this.socket.connect();
    } catch (error) {
      console.error('WebSocket connection error:', error);
      // Handle the error appropriately, e.g., show an error message or retry the connection.
    }
  }

  onBookBorrowed(): Observable<any> {
    return this.socket.fromEvent('bookBorrowed').pipe(
      catchError((error) => {
        console.error('Error in bookBorrowed event:', error);
        return throwError(error); // Handle the error as needed
      })
    );
  }

  onBookReturned(): Observable<any> {
    return this.socket.fromEvent('bookReturned').pipe(
      catchError((error) => {
        console.error('Error in bookReturned event:', error);
        return throwError(error); // Handle the error as needed
      })
    );
  }

  emitBorrowedEvent(payload: any) {
    this.socket.emit('borrowed', payload);
  }

  emitReturnedEvent(payload: any) {
    this.socket.emit('returned', payload);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
