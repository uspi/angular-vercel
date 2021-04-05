import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DataListComponent } from "./data-list/data-list.component";
import { OrderDoneComponent } from "./order-done/order-done.component";
import { OrderFormComponent } from "./order-form/order-form.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
  { path: "new-order", component: OrderFormComponent },
  { path: "data-list", component: DataListComponent },
  { path: "order-done", component: OrderDoneComponent },
  { path: "", redirectTo: "new-order", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
