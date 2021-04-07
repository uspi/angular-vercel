import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html'
})
export class DateSelectorComponent implements OnInit{

  @Output() onDateChanged = new EventEmitter<BehaviorSubject<moment.Moment>>();

  constructor(public dateService: DateService) { }
  ngOnInit(): void {
    this.onDateChanged.emit(this.dateService.date);
  }

  go(dir: number){
    this.dateService.changeMonth(dir);
    this.onDateChanged.emit(this.dateService.date);
  }

  refresh(){
    this.dateService.reset();
    this.onDateChanged.emit(this.dateService.date);
  }
}
