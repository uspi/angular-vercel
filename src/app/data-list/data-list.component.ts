import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataService } from "../data/data.service";
import { Order } from "../order";
import { DateService } from "../shared/date.service";

@Component({
    selector: "data-list",
    templateUrl: "./data-list.component.html"
})

export class DataListComponent implements OnInit{
    
    orders: Observable<Order[]>;

    constructor(private dataService: DataService, private dateService: DateService) { }

    ngOnInit(): void{

        // get observable<order[]> data
        this.orders = this.dataService.getOrders();
        //this.orders = this.dataService.getLastSyncOrders();
 
        // log
        this.dataService.getLastSyncOrders().subscribe(p => console.log("data list component ng on init", p))
    }
}