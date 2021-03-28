import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DataListComponent } from './data-list/data-list.component';
import { DataModule } from './data/data.module';
import { OrderForm } from './order-form/order-form.component';

const appRoutes: Routes = [
  { path: "data-list", component: DataListComponent },
  { path: "", component: OrderForm },
];

@NgModule({
  declarations: [AppComponent ],
  imports: [ 
    DataModule,
    BrowserModule, 
    RouterModule.forRoot(appRoutes)
  ],
  //providers: [HttpService],
  bootstrap: [AppComponent],
})

export class AppModule {}
