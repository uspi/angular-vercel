import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { BehaviorSubject, Observable, pipe } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Order, OrdersService } from "../shared/orders.service";

@Component({
    selector: "data-list",
    templateUrl: "./data-list.component.html"
})

export class DataListComponent implements OnInit{

  currentDate: moment.Moment;

  orders: Observable<Order[]>;
  filteredOrders: Observable<Order[]>;

  constructor(
    private orderService: OrdersService) { }

  ngOnInit(): void{

    // get observable<order[]> data
    this.orders = this.orderService.getOrders().pipe(map(val => {
      return val.sort((a, b) => b.createdOn - a.createdOn)
    }));

    this.sortByMonth();
    //this.sortByAscendingDate();
    //this.orders = this.dataService.getLastSyncOrders();

    // log
    //this.dataService.getLastSyncOrders().subscribe(p => console.log("data list component ng on init", p))
  }

  sortByAscendingDate(){
    this.orders.pipe(map(val => {
      val.sort((a, b) => a.createdOn - b.createdOn)
    }))
  }

  sortByMonth(){
    this.filteredOrders = this.orders.pipe(map(val =>
      val.filter(v => {
        return (new Date(parseInt(v.createdOn)).getMonth()) === (this.currentDate.month())
      })
    ))
  }

  changeDate(date: BehaviorSubject<moment.Moment>){
    console.log("date changed", date.value);
    this.currentDate = date.value;
    this.sortByMonth();

    // const dateUnix = date.value.unix()*1000;

    // console.log("month from moment", date.value.month())

    // console.log("month from unix", new Date(dateUnix).getMonth())
  }
}
