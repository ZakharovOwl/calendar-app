import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppointmentDialogComponent } from '../appointment-dialog/appointment-dialog.component';
import { CalendarService } from '../../services/calendar.service';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewCalendarComponent } from './view-month-calendar/view-calendar.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [{ path: '', component: CalendarComponent }];

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatIconModule,
    DragDropModule,
    AppointmentDialogComponent,
    RouterModule.forChild(routes),
    CalendarHeaderComponent,
    ViewCalendarComponent,
  ],
  providers: [
    {
      provide: CalendarService,
    },
  ],
})
export class CalendarModule {}
