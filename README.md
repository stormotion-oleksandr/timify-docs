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

| Day/Serial | Single/Group | Type      | Key | Vx  | TimifyEventType                |
| ---------- | ------------ | --------- | --- | --- | ------------------------------ |
| day        | single       | once      | TS1 | V3  | DAY_APPOINTMENT                |
| day        | single       | template  | TSS | V3  | DAY_APPOINTMENT                |
| day        | single       | multiple  | TSM | V1  | INDEPENDENT_SERIAL_APPOINTMENT |
| day        | group        |           | TG  | V3  | DAY_APPOINTMENT                |
| serial     | group        | temporary | STG | V2  | CONNECTED_SERIAL_APPOINTMENT   |
| serial     | singel       | temporary | STS | V2  | CONNECTED_SERIAL_APPOINTMENT   |
| serial     | group        | regular   | SRG | V1  | INDEPENDENT_SERIAL_APPOINTMENT |
| serial     | single       | regular   | SRS | V1  | INDEPENDENT_SERIAL_APPOINTMENT |

Description:

- **Day/Serial:** one day appointment or multiple days
- **Single/Group:** Timify service type single or group
- **Type:** once/template/multiple/temporary/regular
- **Key:** part of the name of the bookign in Timify
- **Vx:** design version in Figma
- **TimifyEventType:** design version mapping to event type
- **Design version mapping to TimifyEventType:**

| Design V | TimifyEventType                |
| -------- | ------------------------------ |
| v1       | INDEPENDENT_SERIAL_APPOINTMENT |
| v2       | CONNECTED_SERIAL_APPOINTMENT   |
| v2       | DAY_APPOINTMENT                |
