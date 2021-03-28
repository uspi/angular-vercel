import { Injectable, OnInit, Optional } from "@angular/core";
import { observable, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "../http/http.service";

@Injectable({providedIn: "root"})
export class DataService {

    //private data: string[] = [ "Latte", "Americano", "Espresso"];
    
    //private data: Observable<Object>;

    //constructor(@Optional() private logService: LogService) { }

    constructor(private httpService: HttpService){}

    // ngOnInit() {
    //     this.data = this.httpService.getData();
    // }

    
    getOrders(): Observable<Order[]> {
        // if (this.logService) {
        //     this.logService.write("operation get data");
        // }

        let dataFromServer = this.httpService.getData();

        let mapedDataFromServer = 
            dataFromServer.pipe(map<any, Order[]>(res =>
                    res.map((data: any) => {
                        return {
                            customerName: data.customerName,
                            coffeeType: data.coffee
                        };
                    })
                )
            )
        
        // log
        mapedDataFromServer.subscribe(d => console.log("data service", d));

        return mapedDataFromServer;
    };

    addOrder(order: Order){
        
    }

    // addData(customer: string, coffee: string){
    //     // if (this.logService) {
    //     //     this.logService.write("operation add data");
    //     // }

    //     this.data.push(name);
    // }

    // getUsers() : Observable<User[]> {
    //     return this.http.get('assets/users.json').pipe(map(data=>{
    //         let userList = data["userList"];
    //         return userList.map(function(user:any) {
    //             return {name: user.userName, age: user.userAge};
    //           });
    //     }))
    // };
}

export class Order {
    customerName: string;
    coffeeType: string;
}