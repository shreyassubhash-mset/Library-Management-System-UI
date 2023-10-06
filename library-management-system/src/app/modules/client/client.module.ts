import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { UserDasboardComponent } from './components/user-dasboard/user-dasboard.component';


@NgModule({
  declarations: [
    UserDasboardComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
