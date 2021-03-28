import { Component } from '@angular/core';
import { DataService, Order } from '../data/data.service';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
})

export class OrderForm { 
    order: Order;

    constructor(private dataService: DataService) { }

    submit(){
        this.dataService
    }
}