import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DateService } from '../shared/date.service';
import { Message, Order, OrdersService } from '../shared/orders.service';

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

export const milkValidator: ValidatorFn =
  (control: AbstractControl): ValidationErrors | null => {

    const type: string = control.get("coffeeType").value;
    const hasMilk: boolean = control.get("hasMilk").value;

    // 500 mililiters only americano
    if(type != "Americano"
    && type != ""
    && hasMilk === true){

      console.log("Wrong combination milk and", type)

      return {
        wrongMilkTypeCombination: true,
        wrongMilkType: type
      }
    }

    console.log("Milk and coffee type: Ok")

    // if ok
    return null;
  }

  export const volumeCorrectValidator: ValidatorFn =
  (control: AbstractControl): ValidationErrors | null => {

    const type: string = control.get("coffeeType").value;
    const volume: string = control.get("coffeeVolume").value;

    // 500 mililiters only americano
    if(type != "Americano"
    && type != ""
    && volume === "0,500"){

      console.log("wrong combination")

      return {
        wrongVolumeTypeCombination: true,
        combFirst: type,
        combSecond: volume
      }
    }

    console.log("all ok")
    // if ok
    return null;
  }
