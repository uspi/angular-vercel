import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { filter, map, tap } from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/database"
import { Observable } from "rxjs";

export interface Order {
  id?: string;
  date?: string;
  coffeeType: string;
  coffeeVolume: number;
  sugarTeaspoons: number;
  hasMilk: boolean;
  hasCupCap: boolean;
}

interface CreateResponse{
  name: string;
}

export interface Message {
  message: string;
  time: string;
  date: string;
}

@Injectable({providedIn: "root"})
export class OrdersService {
  static url = "https://coffee-shop-749a4-default-rtdb.europe-west1.firebasedatabase.app/";

  constructor(private http: HttpClient, private realtimeDb: AngularFireDatabase) { }

  create(order: Order){

    //this.http.setServerTrustMode()
    return this.http
      .post<CreateResponse>(`${OrdersService.url}/`, order, {})
      .pipe(map(res => {
        console.log("response", res);
        return res;
      }))
  }

  getRealTimeMessages(): Observable<any> {

    // return observable that is fired whenever an item
    // in the messages list path in the realtime db changes
    return this.realtimeDb
      .list<Message>("messages")
      .valueChanges();
  }

  sendMessage(message: string){
    // get current timestamp
    const currTime = Number(new Date());

    // convert timestamp into readable time string
    const readableTime = new Date(currTime).toLocaleDateString();

    // convert timestamp into readable date
    const readableDate = new Date(currTime).toDateString();

    // push new message to messages list with
    // time and date data
    this.realtimeDb
      .list<Message>("messages")
      .push({
        message,
        time: readableTime,
        date: readableDate
      });

    // //update messages meta data
    // this.realtimeDb
    //   .object("messages")
    //   .update({
    //     "last_updated_at": currTime
    //   });
  }
}
