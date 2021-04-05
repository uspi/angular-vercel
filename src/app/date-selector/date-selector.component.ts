import { Component } from '@angular/core';
import { DateService } from '../shared/date.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html'
})
export class DateSelectorComponent{

  constructor(public dateService: DateService) { }

  go(dir: number){
    this.dateService.changeMonth(dir);
  }
}
