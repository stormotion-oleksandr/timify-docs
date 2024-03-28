# Timify DOCS

## Companies

**Company Admin - A**

[company-admin-a.json](./companies/company-admin-a.json)

```json
{
  "id": "65c39ebd07a04b9210cccb7b",
  "externalId": "1082"
}
```

**Company Admin - B**

[company-admin-b.json](./companies/company-admin-b.json)

```json
{
  "id": "65ca2bb1c1020b3c67633b1a",
  "externalId": "1083"
}
```

## Appointment types

**Event types:**

| ID  | Day/Serial | Single/Group | Type      | Vx  | TimifyEventType                |
| --- | ---------- | ------------ | --------- | --- | ------------------------------ |
| TS1 | day        | single       | once      | V3  | DAY_APPOINTMENT                |
| TSS | day        | single       | template  | V3  | DAY_APPOINTMENT                |
| TSM | day        | single       | multiple  | V1  | INDEPENDENT_SERIAL_APPOINTMENT |
| TG  | day        | group        |           | V3  | DAY_APPOINTMENT                |
| STG | serial     | group        | temporary | V2  | CONNECTED_SERIAL_APPOINTMENT   |
| STS | serial     | singel       | temporary | V2  | CONNECTED_SERIAL_APPOINTMENT   |
| SRG | serial     | group        | regular   | V1  | INDEPENDENT_SERIAL_APPOINTMENT |
| SRS | serial     | single       | regular   | V1  | INDEPENDENT_SERIAL_APPOINTMENT |

Description:

- **ID:** Event type ID, also used as part of the name in Timify bookigns
- **Day/Serial:** one day appointment or multiple days
- **Single/Group:** Timify service type single or group
- **Type:** once/template/multiple/temporary/regular
- **Vx:** design version in Figma
- **TimifyEventType:** design version mapping to event type
- **Design version mapping to TimifyEventType:**

| Design V | TimifyEventType                |
| -------- | ------------------------------ |
| v1       | INDEPENDENT_SERIAL_APPOINTMENT |
| v2       | CONNECTED_SERIAL_APPOINTMENT   |
| v2       | DAY_APPOINTMENT                |

## Bookigns

### Company A

- [TS1](./data/company-a/bookings/appointments/6601c37248e397683a4d4b73-TS1%20Gruppenbuchung%201%20TN%20einmalig%20exklusives%20VIP%20Coaching%20im%20Februar.json)
- [TSS](./data/company-a/bookings/courses/6601ca648975bf54679e9a48-TSS%20Gruppenleistung%20Tages-Termin%201TN%20-%20Meet%20the%20boss.json)
- [TSM](./data/company-a/bookings/services/65fc2c633d7c1e6ce4c235bf-TSM%20Leistung%20Regulär%20Einzeln%20-%20Betriebsarzt.json)
- [TG](./data/company-a/bookings/appointments/6601c29d9343f0d8360dbe8a-TG%20Gruppenbuchung%20mehrere%20TN%20einmalig%20Tagesseminar%20für%20Führungskräfte.json)
- [STG](./data/company-a/bookings/appointments/6601c20a5cdab7a34f9498dd-STG%20Gruppenbuchung%20mehrere%20TN%20Serientermin%20temporär%20-%20Rückenfit%203-Wochen-Kurs.json)
- [STS](./data/company-a/bookings/appointments/6601c24c8b7cc5562cb44940-STS%20Gruppenbuchung%201%20TN%20Serientermin%20BEM%206%20Wochen%20Coaching%20Programm.json)
- [SRG](./data/company-a/bookings/courses/65fc2c96be304f3b4dc9d278-SRG%20Gruppenleistung%20Serientermin%20mehrere%20TN%20+%20getrennt%20-%20Bewegte%20Pause.json)
- [SRS](./data/company-a/bookings/services/6601c9c7e6cc7b523a0a8056-SRS%20Leistung%20Serientermin%201TN%20-%20exkl.%20VIP%20Coaching.json)

## How to we define bookings type

...
