import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateDescribe'
})
export class DateDescribePipe implements PipeTransform {

  constructor(private datePipe: DatePipe){}

  transform(date: string, format: string): string {
    return this.datePipe.transform(date, format, 'UTC')!;
  }

}
