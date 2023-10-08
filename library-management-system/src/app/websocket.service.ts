// websocket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket: Socket;

  constructor() {
    // Connect to your WebSocket server (replace with your server URL)
    this.socket = io('ws://localhost:3000'); // WebSocket server URL
  }

  // Subscribe to notifications
  subscribeToBorrowNotifications(callback: (data: any) => void) {
    this.socket.on('borrowed', callback);
  }

  subscribeToReturnNotifications(callback: (data: any) => void) {
    this.socket.on('returned', callback);
  }
}
