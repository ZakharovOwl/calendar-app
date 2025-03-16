import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CalendarView } from '../../../shared/models';
import { CalendarService } from '../../../services/calendar.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogTitle } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-calendar-header',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIcon,
  ],
  templateUrl: './calendar-header.component.html',
  styleUrl: './calendar-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeaderComponent {
  currentView$: Observable<CalendarView>;
  viewDate$: Observable<Date>;

  protected readonly CalendarView = CalendarView;

  constructor(private calendarService: CalendarService) {
    this.currentView$ = this.calendarService.getCurrentView$;
    this.viewDate$ = this.calendarService.viewDate$.asObservable();
  }

  switchToView(view: CalendarView) {
    this.calendarService.setCurrentView(view);
  }

  previous(): void {
    this.calendarService.previous();
  }

  next(): void {
    this.calendarService.next();
  }

  viewToday(): void {
    this.calendarService.viewToday();
  }

  selectDate(date?: Date, startTime?: string) {
    if (date) {
      this.calendarService.setSelectedDate(date);
    } else {
      this.calendarService.setSelectedDate(new Date());
    }
    if (startTime) {
      this.calendarService.setSelectedStartTime(startTime);
    }
    this.calendarService.openDialog();
  }
}
