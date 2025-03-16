import { Appointment } from '../shared/models';

export const appointments: Appointment[] = [
  {
    uuid: '00000000-0000-0000-0000-000000000001',
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
    title: 'Meeting with Bob',
    startTime: '09:00',
    endTime: '10:00',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000002',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 2),
    title: 'Lunch with Alice',
    startTime: '12:00',
    endTime: '13:00',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000003',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 3),
    title: 'Project Deadline',
    startTime: '15:00',
    endTime: '16:00',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000004',
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
    title: 'Doctor Appointment',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000005',
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 1
    ),
    title: 'Team Meeting',
    startTime: '14:00',
    endTime: '15:00',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000006',
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    ),
    title: 'Coffee with Mike',
    startTime: '11:00',
    endTime: '12:00',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000007',
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 4
    ),
    title: 'Client Call',
    startTime: '09:30',
    endTime: '10:30',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000008',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 8),
    title: 'Gym',
    startTime: '17:00',
    endTime: '18:00',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000009',
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1
    ),
    title: 'Dentist Appointment',
    startTime: '11:30',
    endTime: '12:30',
  },
  {
    uuid: '00000000-0000-0000-0000-00000000000a',
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 2
    ),
    title: 'Birthday Party',
    startTime: '19:00',
    endTime: '21:00',
  },
  {
    uuid: '00000000-0000-0000-0000-00000000000b',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 11),
    title: 'Conference',
    startTime: '13:00',
    endTime: '14:00',
  },
  {
    uuid: '00000000-0000-0000-0000-00000000000c',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 12),
    title: 'Workshop',
    startTime: '10:00',
    endTime: '12:00',
  },
  {
    uuid: '00000000-0000-0000-0000-00000000000d',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 13),
    title: 'Brunch with Sarah',
    startTime: '11:00',
    endTime: '12:00',
  },
  {
    uuid: '00000000-0000-0000-0000-00000000000e',
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 2
    ),
    title: 'Networking Event',
    startTime: '18:00',
    endTime: '20:00',
  },
  {
    uuid: '00000000-0000-0000-0000-00000000000f',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 16),
    title: 'Yoga Class',
    startTime: '07:00',
    endTime: '08:00',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000010',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 16),
    title: 'Strategy Meeting',
    startTime: '10:00',
    endTime: '11:30',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000011',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 17),
    title: 'Call with Investor',
    startTime: '14:00',
    endTime: '15:00',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000012',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 18),
    title: 'Team Lunch',
    startTime: '12:00',
    endTime: '13:00',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000013',
    date: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 3
    ),
    title: 'HR Meeting',
    startTime: '16:00',
    endTime: '17:00',
  },
  {
    uuid: '00000000-0000-0000-0000-000000000014',
    date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
    title: 'Board Meeting',
    startTime: '11:00',
    endTime: '12:00',
  },
];
