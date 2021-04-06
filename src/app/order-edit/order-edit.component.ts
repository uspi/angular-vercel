import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, map, pluck, single, switchMap, take } from 'rxjs/operators';
import { OrdersService } from '../shared/orders.service';
import { objectExists } from '../utils/utilities.service';
//import { Order } from '../order.model';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
})

export class OrderEditComponent implements OnInit {

  // if the user clicks on the submit button, true
  isSubmitted = false;

  // reactive order form
  orderForm: Observable<FormGroup>;

  // variations for choose
  coffeeTypes: string[] = ["Americano", "Latte", "Espresso"];
  coffeeVolumesMililiters: number[] = [133, 255, 500];

  constructor(
    private router: ActivatedRoute,
    private fb: FormBuilder,
    private ordersService: OrdersService) { }

  ngOnInit(): void {

    // check the identifier in the database if such an object is empty,
    // then we are dealing with the creation of a new object in the form.
    // If an object came from a database with data, then we are now
    // editing this object and the form needs to be filled with data
    // from this object for further edits.
    this.orderForm =
      this.router.params
      .pipe(
        pluck('uid'),
        filter(objectExists),
        switchMap(
          uid => combineLatest([of(uid), this.ordersService.getOrder(uid)])
        ),
        map(([uid, order]) =>
          this.fb.group({
            uid            : order ? order.uid : uid,
            coffeeType     : order ? order.coffeeType : '',
            coffeeVolume   : order ? order.coffeeVolume : 0,
            sugarTeaspoons : order ? order.sugarTeaspoons : 0,
            hasMilk        : order ? order.hasMilk : false,
            hasCupCap      : order ? order.hasCupCap : false,
            createdOn      : order ? order.createdOn : '',
            updatedOn      : order ? order.updatedOn : ''
          })
        )
      );
  }

  onSubmit(orderData) {
    // user pressed on submit button
    this.isSubmitted = true;

    let formValid: boolean = false;

    this.orderForm.subscribe(val => formValid = val.valid);

    // if not valid
    if (!formValid) {
      console.log("EDIT COMPONENT | form not valid, VALUE: ", )
      return;
    }

    console.log("order submitted", orderData);
    this.ordersService.updateOrder(orderData);
  }
}
