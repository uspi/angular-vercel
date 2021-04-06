import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "../data/data.service";
//import { Order } from "../order.model";
import { DateService } from "../shared/date.service";
import { Order, OrdersService } from "../shared/orders.service";

@Component({
    selector: "data-list",
    templateUrl: "./data-list.component.html"
})

export class DataListComponent implements OnInit{

  //orders: Observable<Order[]>;

  readonly ordersFirebase: Observable<Order[]> = this.ordersService.getOrders();

  constructor(
    // private dataService: DataService,
    // private dateService: DateService,
    private ordersService: OrdersService,
    private router: Router) { }

  ngOnInit(): void{

    // get observable<order[]> data
    //this.orders = this.dataService.getOrders();

    //this.orders = this.dataService.getLastSyncOrders();

    // log
    //this.dataService.getLastSyncOrders().subscribe(p => console.log("data list component ng on init", p))
  }

  editOrder(orderUid?: string){
    if (orderUid) {
      this.router.navigate([`edit/${orderUid}`]);
    } else {
      this.router.navigate([`/edit/`]);
    }
  }
}
