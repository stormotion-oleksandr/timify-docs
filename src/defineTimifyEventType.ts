export enum TimifyEventType {
  DAY_APPOINTMENT = "DAY_APPOINTMENT",
  CONNECTED_SERIAL_APPOINTMENT = "CONNECTED_SERIAL_APPOINTMENT",
  INDEPENDENT_SERIAL_APPOINTMENT = "INDEPENDENT_SERIAL_APPOINTMENT",
}

export enum TimifyBookingType {
  SERVICE = "SERVICE",
  COURSE = "COURSE",
  APPOINTMENT = "APPOINTMENT",
}

export function defineTimifyEventType(
  bookingType: TimifyBookingType,
  data: Record<string, any>,
) {
  if (bookingType === TimifyBookingType.SERVICE) {
    return TimifyEventType.INDEPENDENT_SERIAL_APPOINTMENT;
  } else if (bookingType === TimifyBookingType.COURSE) {
    return data?.[0]?.maxParticipants === 1
      ? TimifyEventType.DAY_APPOINTMENT
      : TimifyEventType.INDEPENDENT_SERIAL_APPOINTMENT;
  } else if (bookingType === TimifyBookingType.APPOINTMENT) {
    return data?.recurring
      ? TimifyEventType.CONNECTED_SERIAL_APPOINTMENT
      : TimifyEventType.DAY_APPOINTMENT;
  }
}
