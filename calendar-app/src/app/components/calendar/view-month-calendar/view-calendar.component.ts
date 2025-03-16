import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../../services/calendar.service';
import { Appointment, CalendarView } from '../../../shared/models';
import { IsTodayPipe } from '../../../shared/pipes/is-today.pipe';
import { IsSameDatePipe } from '../../../shared/pipes/is-same-date.pipe';
import { IsCurrentMonthPipe } from '../../../shared/pipes/is-current-month.pipe';
import { getTimeSlots } from '../../../shared/helpers/getTimeSlots';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-view-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CdkDrag,
    CdkDropListGroup,
    CdkDropList,
    CdkDragHandle,
    IsTodayPipe,
    IsSameDatePipe,
    IsCurrentMonthPipe,
  ],
  templateUrl: './view-calendar.component.html',
  styleUrl: './view-calendar.component.scss',
})
export class ViewCalendarComponent {
  currentView$: Observable<CalendarView>;
  viewDate$: Observable<Date>;
  monthDays$: Observable<Date[]>;
  weeks$: Observable<Date[][]>;
  appointments$: BehaviorSubject<Appointment[]>;

  readonly weekDays: string[] = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
  ];
  readonly timeSlots = getTimeSlots();
  readonly CalendarView = CalendarView;

  constructor(private calendarService: CalendarService) {
    this.currentView$ = this.calendarService.currentView$;
    this.viewDate$ = this.calendarService.viewDate$;
    this.monthDays$ = this.calendarService.monthDays$;
    this.weeks$ = this.calendarService.weeks$;
    this.appointments$ = this.calendarService.appointments$;
  }

  drop(event: CdkDragDrop<Appointment[]>, date: Date, slot?: string) {
    const movedAppointment = event.item.data;
    movedAppointment.date = date;
    if (slot) {
      movedAppointment.startTime = slot;
      movedAppointment.endTime = slot;
    }
  }

  selectDate(date?: Date, startTime?: string): void {
    this.calendarService.selectDate(date, startTime);
  }

  editAppointment(appointment: Appointment, event: Event): void {
    event.preventDefault();
    this.calendarService.editAppointment(appointment);
  }

  isAppointmentsForDateTime(
    appointment: Appointment,
    date: Date,
    timeSlot: string
  ): boolean {
    return (
      this.isSameDate(appointment.date, date) &&
      appointment.startTime <= timeSlot &&
      appointment.endTime >= timeSlot
    );
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
}
