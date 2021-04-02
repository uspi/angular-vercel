import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { DataListComponent } from './data-list/data-list.component';
import { DataModule } from './data/data.module';
import { OrderForm } from './order-form/order-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderDoneComponent } from './order-done/order-done.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MomentPipe } from './shared/moment.pipe';

const appRoutes: Routes = [
  { path: "new-order", component: OrderForm },
  { path: "data-list", component: DataListComponent },
  { path: "order-done", component: OrderDoneComponent },
  { path: "", redirectTo: "new-order", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent, 
    OrderDoneComponent, 
    PageNotFoundComponent, 
    TopBarComponent, 
    OrderForm,
    
  ],
  imports: [ 
    DataModule,
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  //providers: [HttpService],
  bootstrap: [AppComponent],
})

export class AppModule {}
