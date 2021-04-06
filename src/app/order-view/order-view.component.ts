import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { filter, pluck, switchMap } from "rxjs/operators";
import { Order, OrdersService } from "../shared/orders.service";
import { objectExists } from "../utils/utilities.service";

@Component({
  selector: "app-order-view",
  templateUrl: "./order-view.component.html"
})
export class OrderViewComponent {

  order: Observable<Order> =
    this.router.params.pipe(
      pluck('uid'),
      filter(objectExists),
      switchMap(this.db.getOrder)
    );

  constructor(
    private db: OrdersService,
    private router: ActivatedRoute) {
  }
}
