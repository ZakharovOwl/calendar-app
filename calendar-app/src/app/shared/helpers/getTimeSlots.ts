export function getTimeSlots(): string[] {
  const timeSlots: string[] = [];

  for (let hour = 0; hour <= 24; hour++) {
    const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
    timeSlots.push(time);
  }
  return timeSlots;
}
