import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { map, scan } from "rxjs/operators";
import { HttpService } from "../http/http.service";
import { Order } from "../order";

@Injectable({providedIn: "root"})
export class DataService {

    //private data: string[] = [ "Latte", "Americano", "Espresso"];
    
    private data: Observable<Order[]>;
    private fakeData: Order[]=[];

    //constructor(@Optional() private logService: LogService) { }

    constructor(private httpService: HttpService){
        this.init();
    }

    // start initialization
    init(): void {
        this.data = this.getOrders();
    }

    // get data from current service 
    getLastSyncOrders(): Observable<Order[]>{
        let aa = of(this.fakeData);

        console.log("this fake data", this.fakeData);

        aa.subscribe(c => console.log("get last sync orders", c))

        return from(this.fakeData)
            .pipe(scan((acc, v) => acc.concat(v), []));
        //return this.data;
    }

    // send request to http service and get data
    getOrders(): Observable<Order[]> {
        // if (this.logService) {
        //     this.logService.write("operation get data");
        // }

        let dataFromServer = this.httpService.getData();

        let mapedDataFromServer = 
            // map array
            dataFromServer.pipe(map<any, Order[]>(res =>

                // map array element
                res.map((data: any) => {

                    // create order item
                    let order: Order = {
                        coffeeType: data.coffeeType,
                        coffeeVolume: data.coffeeVolume,
                        sugarTeaspoons: data.sugarTeaspoons,
                        hasMilk: data.hasMilk,
                        hasCupCap: data.hasCupCap
                    }
                    return order;
                })
            ));
        
        // log
        mapedDataFromServer.subscribe(d => { 
            console.log("data service", d);
            this.fakeData = d;
        });

        //mapedDataFromServer.subscribe(v => this.fakeData = v as Order[]);

        return mapedDataFromServer;
    };

    addOrder(order: Order): void{
        console.log("add order DATA SERVICE", order)

        this.fakeData.push(order);
        console.log(this.fakeData);

        // this.data.pipe(tap(list => {
        //     list.push(order);
        // }));

        // this.data.subscribe(v => console.log(v));
        
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

