import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DataModule } from './data/data.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { UtilsModule } from './utils/utils.module';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

// fire base
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from "@angular/fire/firestore"

// components
import { OrderDoneComponent } from './order-done/order-done.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderEditComponent } from './order-edit/order-edit.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderDoneComponent,
    PageNotFoundComponent,
    TopBarComponent,
    OrderFormComponent,
    OrderViewComponent,
    OrderEditComponent
  ],
  imports: [
    DataModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UtilsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
