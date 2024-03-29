export enum TimifyEventType {
  DAY_APPOINTMENT = "DAY_APPOINTMENT",
  CONNECTED_SERIAL_APPOINTMENT = "CONNECTED_SERIAL_APPOINTMENT",
  INDEPENDENT_SERIAL_APPOINTMENT = "INDEPENDENT_SERIAL_APPOINTMENT",
}

export enum BookingType {
  SERVICE = "SERVICE",
  COURSE = "COURSE",
  APPOINTMENT = "APPOINTMENT",
}

export function defineTimifyEventType(
  bookingType: BookingType,
  data: Record<string, any>,
) {
  if (bookingType === BookingType.SERVICE) {
    return TimifyEventType.INDEPENDENT_SERIAL_APPOINTMENT;
  } else if (bookingType === BookingType.COURSE) {
    return data?.groupEvents?.length === 1
      ? TimifyEventType.DAY_APPOINTMENT
      : TimifyEventType.INDEPENDENT_SERIAL_APPOINTMENT;
  } else if (bookingType === BookingType.APPOINTMENT) {
    return data?.recurring
      ? TimifyEventType.CONNECTED_SERIAL_APPOINTMENT
      : TimifyEventType.DAY_APPOINTMENT;
  }
}
