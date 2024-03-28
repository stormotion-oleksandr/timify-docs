import axios from "axios";
import companyA from "../data/company-a/company-admin-a.json";
import companyB from "../data/company-b/company-admin-b.json";
import * as path from "path";
import * as fs from "fs/promises";

type Company = typeof companyA;

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoU2NvcGUiOiJBUFAiLCJ1c2VySWQiOiI2NWIyNzE5NjBhNzc4YmE4YTJmZjI3ZTUiLCJhY2NvdW50SWQiOmZhbHNlLCJyZWdpb24iOmZhbHNlLCJsb25nU2Vzc2lvbiI6ZmFsc2UsImxvbmdBY2Nlc3NUb2tlbkR1cmF0aW9uIjpmYWxzZSwidmVyc2lvbiI6Miwiand0SWQiOiI2NjA1YzdlYmUyMjU5MjMyN2E4OTYzMjEiLCJpYXQiOjE3MTE2NTQ4OTEsImV4cCI6MTcxMTY2MjA5MX0.-reVamu0Y96WEeSz5UhGSdLvCCSD-69vMk9XHhbmttw";
const ROOT = path.join(__dirname, "..");

export function generateDays(numberOfDays = 14, from?: Date, to?: Date) {
  const days: Array<Date> = [];
  const fromDate = from || new Date();
  const toDate = to || new Date(fromDate);

  if (!to) {
    toDate.setUTCDate(toDate.getUTCDate() + numberOfDays);
  }

  while (true) {
    if (fromDate > toDate) {
      break;
    }

    days.push(new Date(fromDate));
    fromDate.setUTCDate(fromDate.getUTCDate() + 1);
  }

  return days;
}

async function getAvailabilities(options: {
  company_id: string;
  service_id?: string;
  course_id?: string;
  days: Date[];
}) {
  try {
    const data = await axios.get(
      `https://api.timify.com/v1/booker-services/availabilities`,
      {
        params: {
          company_id: options.company_id,
          service_id: options.service_id,
          course_id: options.course_id,
          days: options.days.map((day) => day.toISOString().slice(0, 10)),
        },
      },
    );

    if (data.status !== 200) {
      console.log("Failed to get service data");
      return;
    }

    return data.data?.data;
  } catch (e: any) {
    console.log("Failed to get service data");
  }
}

async function getAppointment(options: {
  appointment_id: string;
  company_id: string;
}) {
  try {
    const data = await axios.get(
      `https://api.timify.com/v1/appointments/${options.appointment_id}`,
      {
        headers: {
          "company-id": options.company_id,
          authorization: ACCESS_TOKEN,
        },
      },
    );

    if (data.status !== 200) {
      console.log("Failed to get appointemtn data");
      return;
    }

    return data.data?.data;
  } catch (e: any) {
    console.log("Failed to get appointemtn data");
  }
}

async function getAllCompanyData(company: Company, companyRoot: string) {
  const days = generateDays(7);

  // Process services
  for (const service of company.data.companies[0].services) {
    const data = await getAvailabilities({
      company_id: company.data.companies[0].id,
      service_id: service.id,
      days: days,
    });

    console.log(service.name, `<<< service, ${company.data.companies[0].name}`);

    await fs.writeFile(
      path.join(
        companyRoot,
        "bookings",
        "services",
        `${service.id}-${service.name}.json`,
      ),
      Buffer.from(JSON.stringify(data || {}, null, 4)),
    );
  }

  // Process group services
  for (const groupService of company.data.companies[0].groupServices) {
    if (groupService.categoryId) {
      const data = await getAvailabilities({
        company_id: company.data.companies[0].id,
        course_id: groupService.id,
        days,
      });

      console.log(
        groupService.name,
        `<<< groupService, ${company.data.companies[0].name}`,
      );

      await fs.writeFile(
        path.join(
          companyRoot,
          "bookings",
          "courses",
          `${groupService.id}-${groupService.name}.json`,
        ),
        Buffer.from(JSON.stringify(data || {}, null, 4)),
      );
    } else {
      const data = await getAppointment({
        company_id: company.data.companies[0].id,
        appointment_id: groupService.id,
      });

      console.log(
        groupService.name,
        `<<< groupService, ${company.data.companies[0].name}`,
      );

      await fs.writeFile(
        path.join(
          companyRoot,
          "bookings",
          "appointments",
          `${groupService.id}-${groupService.name}.json`,
        ),
        Buffer.from(JSON.stringify(data || {}, null, 4)),
      );
    }
  }
}

async function main() {
  await getAllCompanyData(companyA, path.join(ROOT, "data", "company-a"));
  await getAllCompanyData(companyB, path.join(ROOT, "data", "company-b"));
}

main();
