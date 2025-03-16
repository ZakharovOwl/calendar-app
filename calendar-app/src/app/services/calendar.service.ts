import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentDialogComponent } from '../components/appointment-dialog/appointment-dialog.component';
import { appointments } from './appointments-mock';
import { Appointment, CalendarView } from '../shared/models';
import { getRandomColor } from '../shared/helpers/getRandomColor';
import {
  BehaviorSubject,
  combineLatest,
  map,
  shareReplay,
  take,
  tap,
} from 'rxjs';
import { startOfWeek } from '../shared/helpers/startOfWeek';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class CalendarService {
  appointments$ = new BehaviorSubject<Appointment[]>(appointments);
  currentView$ = new BehaviorSubject<CalendarView>(CalendarView.Month);
  viewDate$ = new BehaviorSubject<Date>(new Date());
  monthDays$ = new BehaviorSubject<Date[]>([]);
  weeks$ = new BehaviorSubject<Date[][]>([]);

  // state
  selectedDate: Date | null = null;
  selectedStartTime: string | undefined;

  getCurrentView$ = combineLatest([
    this.currentView$.asObservable(),
    this.viewDate$,
  ]).pipe(
    tap(([currentView$, viewDate$]: [CalendarView, Date]) => {
      this.generateView(currentView$, viewDate$);
    }),
    map(([currentView$]: [CalendarView, Date]) => currentView$),
    shareReplay(1)
  );

  constructor(public dialog: MatDialog) {
    this.appointments$.next(
      this.appointments$.value.map((appointment: Appointment) => ({
        ...appointment,
        color: getRandomColor(),
      }))
    );
  }

  previous() {
    const currentDate = new Date(this.viewDate$.value);
    let date;
    if (this.currentView$.value === CalendarView.Month) {
      date = currentDate.setMonth(currentDate.getMonth() - 1);
    } else if (this.currentView$.value === CalendarView.Week) {
      date = currentDate.setDate(currentDate.getDate() - 7);
    } else {
      date = currentDate.setDate(currentDate.getDate() - 1);
    }

    this.viewDate$.next(new Date(date));
  }

  next() {
    const currentDate = new Date(this.viewDate$.value);
    let date;
    if (this.currentView$.value === CalendarView.Month) {
      date = currentDate.setMonth(currentDate.getMonth() + 1);
    } else if (this.currentView$.value === CalendarView.Week) {
      date = currentDate.setDate(currentDate.getDate() + 7);
    } else {
      date = currentDate.setDate(currentDate.getDate() + 1);
    }

    this.viewDate$.next(new Date(date));
  }

  viewToday(): void {
    this.viewDate$.next(new Date());
  }

  setSelectedDate(date: Date): void {
    this.selectedDate = date;
  }

  setSelectedStartTime(date: string): void {
    this.selectedStartTime = date;
  }

  openDialog(): void {
    const hour = new Date().getHours();
    const minutes = new Date().getMinutes();
    const h = hour < 10 ? `0${hour}` : hour;
    const m = minutes < 10 ? `0${minutes}` : minutes;
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      panelClass: 'dialog-container',
      data: {
        date: this.selectedDate,
        title: '',
        startTime: this.selectedStartTime || `${h}:${m}`,
        endTime: this.selectedStartTime || `${h}:${m}`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          this.addAppointment(
            result.date,
            result.title,
            result.startTime,
            result.endTime
          );
        }
      });
  }

  addAppointment(
    date: Date,
    title: string,
    startTime: string,
    endTime: string
  ) {
    const newAppointment: Appointment = {
      uuid: uuidv4(),
      date,
      title,
      startTime,
      endTime,
      color: getRandomColor(),
    };
    const appointments = this.appointments$.value;
    appointments.push(newAppointment);
    this.appointments$.next(appointments);
    console.log('appointments', appointments);
  }

  setCurrentView(currentView: CalendarView): void {
    this.currentView$.next(currentView);
  }

  generateView(view: CalendarView, date: Date) {
    switch (view) {
      case CalendarView.Month:
        this.generateMonthView(date);
        break;
      case CalendarView.Week:
        this.generateWeekView(date);
        break;
      case CalendarView.Day:
        this.generateDayView(date);
        break;
      default:
        this.generateMonthView(date);
    }
  }

  private generateMonthView(date: Date) {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.weeks$.next([]);
    let week: Date[] = [];
    this.monthDays$.next([]);

    for (let day = start.getDay(); day > 0; day--) {
      const prevDate = new Date(start);
      prevDate.setDate(start.getDate() - day);
      week.push(prevDate);
      this.monthDays$.value.push(prevDate);
    }

    for (let day = 1; day <= end.getDate(); day++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
      this.monthDays$.value.push(currentDate);
      week.push(currentDate);
      if (week.length === 7) {
        const weeks = this.weeks$.value;
        weeks.push(week);
        this.weeks$.next(weeks);
        week = [];
      }
    }

    for (let day = 1; this.monthDays$.value.length % 7 !== 0; day++) {
      const nextDate = new Date(end);
      nextDate.setDate(end.getDate() + day);
      this.monthDays$.value.push(nextDate);
    }

    for (let day = 1; week.length < 7; day++) {
      const nextDate = new Date(end);
      nextDate.setDate(end.getDate() + day);
      week.push(nextDate);
    }

    if (week.length > 0) {
      const weeks = this.weeks$.value;
      weeks.push(week);
      this.weeks$.next(weeks);
    }
  }

  private generateWeekView(date: Date) {
    const timeStartOfWeek = startOfWeek(date);
    this.monthDays$.next([]);

    for (let day = 0; day < 7; day++) {
      const weekDate = new Date(timeStartOfWeek);
      weekDate.setDate(timeStartOfWeek.getDate() + day);
      this.monthDays$.value.push(weekDate);
    }
  }

  private generateDayView(date: Date): void {
    console.log('123');
    this.monthDays$.next([date]);
  }

  selectDate(date?: Date, startTime?: string) {
    if (date) {
      this.selectedDate = date;
    } else {
      this.selectedDate = new Date();
    }
    this.selectedStartTime = startTime;
    this.openDialog();
  }

  editAppointment(appointment: Appointment): void {
    const dialogRef = this.dialog.open(AppointmentDialogComponent, {
      width: '500px',
      panelClass: 'dialog-container',
      data: appointment,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.appointments$.value.findIndex(
          (appointment) => appointment.uuid === result.uuid
        );
        const appointments = this.appointments$.value;
        if (result.remove) {
          appointments.splice(index, 1);
        } else {
          appointments[index] = result;
        }
        this.appointments$.next(appointments);
      }
    });
  }
}
