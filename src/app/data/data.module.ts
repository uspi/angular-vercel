import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { DataListComponent } from '../data-list/data-list.component';
import { HttpService } from '../http/http.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { MomentPipe } from '../shared/moment.pipe';
import { DateService } from '../shared/date.service';

@NgModule({
    imports:      [ BrowserModule, FormsModule, CommonModule, HttpClientModule],
    declarations: [ DataListComponent, MomentPipe],
    providers:    [ HttpService, DataService, DateService ],
    exports:      [ DataListComponent] 
})
export class DataModule { }