import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

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
