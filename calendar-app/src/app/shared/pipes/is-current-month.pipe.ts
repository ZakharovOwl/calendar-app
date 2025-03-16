import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isCurrentMonth',
  standalone: true,
})
export class IsCurrentMonthPipe implements PipeTransform {
  transform(date: Date, viewDate: Date): boolean {
    return (
      date.getMonth() === viewDate.getMonth() &&
      date.getFullYear() === viewDate.getFullYear()
    );
  }
}
