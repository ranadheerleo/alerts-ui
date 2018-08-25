import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AlertFilterComponent } from './alert-filter/alert-filter.component';
import { AlertListComponent } from './alert-list/alert-list.component';
import { AlretDetailComponent } from './alret-detail/alert-detail.component';
import {AgGridModule} from 'ag-grid-angular';
import {AlertService} from './alert-service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AlertFilterComponent,
    AlertListComponent,
    AlretDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
