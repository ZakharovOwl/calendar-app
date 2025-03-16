import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsTodayPipe } from './pipes/is-today.pipe';
import { IsCurrentMonthPipe } from './pipes/is-current-month.pipe';
import { IsSameDatePipe } from './pipes/is-same-date.pipe';

@NgModule({
  declarations: [],
  imports: [CommonModule, IsTodayPipe, IsCurrentMonthPipe, IsSameDatePipe],
  exports: [IsTodayPipe, IsCurrentMonthPipe, IsSameDatePipe],
})
export class SharedModule {}
