import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService, Order } from '../data/data.service';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
})

export class OrderForm { 
  a: any;
  newOrder: Order;

  orderForm: FormGroup = new FormGroup({
    "coffeeType": new FormControl(""),
    "volume": new FormControl("")
  });

  constructor(private dataService: DataService) { }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.orderForm.value);
  }

  customOrder(){
    this.orderForm.patchValue({
      coffeeType: "Americano",
      volume: 2
    })
  }
}