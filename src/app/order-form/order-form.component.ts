import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DateService } from '../shared/date.service';
import { Message, Order, OrdersService } from '../shared/orders.service';
import { milkValidator, volumeCorrectValidator } from './order-form.validators';

@Component({
  selector: 'order-form',
  templateUrl: './order-form.component.html',
})

export class OrderFormComponent implements OnInit {

  orderAddedBanneer: boolean = false;
  allMessages: Observable<Message>;

  // if the user clicks on the submit button, true
  isSubmitted = false;

  // reactive order form
  orderForm: FormGroup;

  coffeeTypes: string[] = ["Americano", "Latte", "Espresso"];
  coffeeVolumesMililiters: number[] = [133, 255, 500];

  //#region Accessors
  get volume(): AbstractControl {return this.orderForm.get("coffeeVolume")}
  get type(): AbstractControl {return this.orderForm.get("coffeeType")}
  get sugar(): AbstractControl {return this.orderForm.get("sugarTeaspoons")}
  get milk(): AbstractControl {return this.orderForm.get("hasMilk")}
  get cupCap(): AbstractControl {return this.orderForm.get("hasCupCap")}
  //#endregion

  constructor(
    private fb: FormBuilder,
    private dateService: DateService,
    private ordersService: OrdersService) { }

  ngOnInit(): void {

    // build order form
    this.orderForm = this.fb.group({
      coffeeVolume: ["",Validators.required],
      coffeeType: ["", Validators.required],
      sugarTeaspoons: [0, Validators.required],
      hasMilk: false,
      hasCupCap: false
    },{
      validators: [milkValidator, volumeCorrectValidator]
    });

    console.log("ORDER FORM COMPONENT ngOnInit | ", this.dateService.date.value)

    //this.allMessages = this.ordersService.getRealTimeMessages();
  }

  onSubmit() {
    // user pressed on submit button
    this.isSubmitted = true;

    // if not valid
    if (!this.orderForm.valid) {
      return;
    }

    const formValue = this.orderForm.value;

    // add logic
    const order: Order = {
      coffeeVolume: formValue.coffeeVolume,
      coffeeType: formValue.coffeeType,
      sugarTeaspoons: formValue.sugarTeaspoons,
      hasMilk: formValue.hasMilk,
      hasCupCap: formValue.hasCupCap
    }

    this.ordersService.createOrder(order);
    this.isSubmitted = false;

    this.orderForm.reset()

    this.orderAddedBanneer = true;
    setInterval(() => this.orderAddedBanneer = false, 2000)

    console.log("ORDER ADDED | on submit method");

    // add order
    // this.ordersService.create(order).subscribe(
    //   (next) => {
    //     this.orderForm.reset()
    //   },
    //   (error) => {
    //     console.error(error)
    //   },
    //   () => {
    //     console.log("ORDER ADDED | on submit method");
    //   }
    // );

    // let newOrder: Order = {
    //   coffeeVolume: formValue.coffeeVolume,
    //   coffeeType: formValue.coffeeType,
    //   sugarTeaspoons: formValue.sugarTeaspoons,
    //   hasMilk: formValue.hasMilk,
    //   hasCupCap: formValue.hasCupCap
    // };

    // this.dataService.addOrder(newOrder);

    //this.router.navigate(["order-done"]);
  }

  sendMessage(message: string){
    this.ordersService.sendMessage(message);
  }
}


