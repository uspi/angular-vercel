import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { DataListComponent } from '../data-list/data-list.component';
import { HttpService } from '../http/http.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { DateService } from '../shared/date.service';
import { UtilsModule } from '../utils/utils.module';
import { DateSelectorComponent } from '../date-selector/date-selector.component';

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
      CommonModule,
      HttpClientModule,
      UtilsModule
    ],
    declarations: [
      DataListComponent,
      DateSelectorComponent
    ],
    providers: [
      HttpService,
      DataService,
      DateService
    ],
    exports: [
      DataListComponent,
      DateSelectorComponent
    ]
})
export class DataModule { }
