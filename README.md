# Timify DOCS

## index.ts util

How to run:

```sh
yarn dev --access-token access-token
```

## Companies

**Company Admin - A:**

[company-admin-a.json](./companies/company-admin-a.json)

````json
{
  "id": "65c39ebd07a04b9210cccb7b",
  "externalId": "1082"
}
```

**Company Admin - B:**

[company-admin-b.json](./companies/company-admin-b.json)

```json
{
  "id": "65ca2bb1c1020b3c67633b1a",
  "externalId": "1083"
}
````

## Appointment types

### Booking types

| Key | TimifyEventType                | Vx  | Booking type | Day/Serial | Single/Group | Type      |
| --- | ------------------------------ | --- | ------------ | ---------- | ------------ | --------- |
| TS1 | DAY_APPOINTMENT                | V3  | appointment  | day        | single       | once      |
| TSS | DAY_APPOINTMENT                | V3  | course       | day        | single       | template  |
| TSM | INDEPENDENT_SERIAL_APPOINTMENT | V1  | service      | day        | single       | multiple  |
| TG  | DAY_APPOINTMENT                | V3  | appointment  | day        | group        |           |
| STG | CONNECTED_SERIAL_APPOINTMENT   | V2  | appointment  | serial     | group        | temporary |
| STS | CONNECTED_SERIAL_APPOINTMENT   | V2  | appointment  | serial     | single       | temporary |
| SRG | INDEPENDENT_SERIAL_APPOINTMENT | V1  | course       | serial     | group        | regular   |
| SRS | INDEPENDENT_SERIAL_APPOINTMENT | V1  | service      | serial     | single       | regular   |

Description:

- Key: Event type ID, also used as part of the name in Timify bookings
- TimifyEventType: design version mapping to event type
- Vx: design version in Figma
- Booking type: Timify booking type (service, course, appointment)
- Day/Serial: one day appointment or multiple days
- Single/Group: Timify service type single or group
- Type: once/template/multiple/temporary/regular

**Design version mapping to TimifyEventTyp:**

| Design V | TimifyEventType                |
| -------- | ------------------------------ |
| v1       | INDEPENDENT_SERIAL_APPOINTMENT |
| v2       | CONNECTED_SERIAL_APPOINTMENT   |
| v2       | DAY_APPOINTMENT                |

**TimifyEventType mapping to Keys:**
| TimifyEventType | Keys |
| ------------------------------ | :-------------------: |
| INDEPENDENT_SERIAL_APPOINTMENT | `SRG`, `SRS`, `TSM` |
| CONNECTED_SERIAL_APPOINTMENT | `STG`, `STS` |
| DAY_APPOINTMENT | `TS1`, `TSS`, `TG` |

**Booking keys mapping to files:**

- [TS1](./data/Company%20Admin%20-%20A/bookings/appointments/6601c37248e397683a4d4b73%20-%20TS1%20Gruppenbuchung%201%20TN%20einmalig%20exklusives%20VIP%20Coaching%20im%20Februar.json)
- [TSS](./data/Company%20Admin%20-%20A/bookings/courses/6601ca648975bf54679e9a48%20-%20TSS%20Gruppenleistung%20Tages-Termin%201TN%20-%20Meet%20the%20boss.json)
- [TSM](./data/Company%20Admin%20-%20A/bookings/services/65fc2c633d7c1e6ce4c235bf%20-%20TSM%20Leistung%20Regulär%20Einzeln%20-%20Betriebsarzt.json)
- [TG](./data/Company%20Admin%20-%20A/bookings/appointments/6601c29d9343f0d8360dbe8a%20-%20TG%20Gruppenbuchung%20mehrere%20TN%20einmalig%20Tagesseminar%20für%20Führungskräfte.json)
- [STG](./data/Company%20Admin%20-%20A//bookings/appointments/6601c20a5cdab7a34f9498dd%20-%20STG%20Gruppenbuchung%20mehrere%20TN%20Serientermin%20temporär%20-%20Rückenfit%203-Wochen-Kurs.json)
- [STS](./data/Company%20Admin%20-%20A/bookings/appointments/6601c24c8b7cc5562cb44940%20-%20STS%20Gruppenbuchung%201%20TN%20Serientermin%20BEM%206%20Wochen%20Coaching%20Programm.json)
- [SRG](./data/Company%20Admin%20-%20A/bookings/courses/65fc2c96be304f3b4dc9d278%20-%20SRG%20Gruppenleistung%20Serientermin%20mehrere%20TN%20+%20getrennt%20-%20Bewegte%20Pause.json)
- [SRS](./data/Company%20Admin%20-%20A/bookings/services/6601c9c7e6cc7b523a0a8056%20-%20SRS%20Leistung%20Serientermin%201TN%20-%20exkl.%20VIP%20Coaching.json)

## How to define bookings type

**Properties table:**

| Key | TimifyEventType                | Booking Type | onDays | slots | recurring | groupEvents | bookings | course  | isCourse | service | maxParticipants |
| --- | ------------------------------ | ------------ | ------ | ----- | --------- | ----------- | -------- | ------- | -------- | ------- | --------------- |
| TS1 | DAY_APPOINTMENT                | appointment  |        |       | null      | null        | 1        |         | true     | null    | 1               |
| TSS | DAY_APPOINTMENT                | course       | 1      | 1     |           | 1           |          | != null |          |         | 15              |
| TSM | INDEPENDENT_SERIAL_APPOINTMENT | service      | 1...x  | 1...x |           |             |          |         |          | != null |                 |
| TG  | DAY_APPOINTMENT                | appointment  |        |       | null      |             | 1        |         | true     | null    | 14              |
| STG | CONNECTED_SERIAL_APPOINTMENT   | appointment  |        |       | != null   |             | 1...x    |         | true     | null    | 15              |
| STS | CONNECTED_SERIAL_APPOINTMENT   | appointment  |        |       | != null   |             | 1...x    |         | true     | null    | 1               |
| SRG | INDEPENDENT_SERIAL_APPOINTMENT | course       | 1      | 0     |           | 0           |          | != null |          |         | 15              |
| SRS | INDEPENDENT_SERIAL_APPOINTMENT | service      | 1...x  | 1...x |           |             |          |         |          | != null |                 |

**A way define TimifyEventType:**

- service: `INDEPENDENT_SERIAL_APPOINTMENT`
- course: `groupEvents.length === 1 ? DAY_APPOINTMENT : INDEPENDENT_SERIAL_APPOINTMENT`
- appointment: `recurring !== null ? CONNECTED_SERIAL_APPOINTMENT : DAY_APPOINTMENT`

**TS function:**

```ts
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
    return data?.groupEvents?.length === 1
      ? TimifyEventType.DAY_APPOINTMENT
      : TimifyEventType.INDEPENDENT_SERIAL_APPOINTMENT;
  } else if (bookingType === TimifyBookingType.APPOINTMENT) {
    return data?.recurring
      ? TimifyEventType.CONNECTED_SERIAL_APPOINTMENT
      : TimifyEventType.DAY_APPOINTMENT;
  }
}
```
