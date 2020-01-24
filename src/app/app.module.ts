import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { RouteComponent } from './route/route.component';
import { HistoryService } from './history.service';
import { HistoryComponent } from './history/history.component';

@NgModule({
  imports:      [ BrowserModule, CommonModule, FormsModule, AppRoutingModule],
  declarations: [ AppComponent, HelloComponent, RouteComponent, HistoryComponent ],
  bootstrap:    [ AppComponent ],
  providers: [HistoryService]
})
export class AppModule { }
