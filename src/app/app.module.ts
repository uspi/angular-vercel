import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// components
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DataListComponent } from './data-list/data-list.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderDoneComponent } from './order-done/order-done.component';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// modules
import { UtilsModule } from './utils/utils.module';
import { AppRoutingModule } from './app-routing.module';

import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    OrderDoneComponent,
    PageNotFoundComponent,
    TopBarComponent,
    OrderFormComponent,
    DataListComponent,
    DateSelectorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UtilsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    CommonModule,
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
