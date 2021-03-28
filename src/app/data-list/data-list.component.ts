import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { DataService, Order } from "../data/data.service";

@Component({
    selector: "data-list",
    templateUrl: "./data-list.component.html"
})

export class DataListComponent implements OnInit{
    
    orders: Observable<Order[]>;

    constructor(private dataService: DataService) { }

    ngOnInit(): void{

        // get observable<order[]> data
        this.orders = this.dataService.getOrders();
    }
}