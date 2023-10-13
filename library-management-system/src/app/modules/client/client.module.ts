import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { UserDasboardComponent } from './components/user-dasboard/user-dasboard.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';
import { BorrowComponent } from './components/borrow/borrow.component';
import { HistoryComponent } from './components/history/history.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { WebSocketService } from 'src/app/websocket.service';
import { AdminModule } from '../admin/admin.module';
import { AddComponent } from '../admin/components/add/add.component';
import { BookComponent } from '../admin/components/book/book.component';
import { AuthenticationGuard } from 'src/app/guards/authentication.guard';

@NgModule({
  declarations: [
    UserDasboardComponent,
    HomeComponent,
    BorrowComponent,
    HistoryComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MatIconModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    AdminModule
  ],
  providers: [WebSocketService, AuthenticationGuard],
})
export class ClientModule { }
