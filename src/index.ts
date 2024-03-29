import axios from "axios";
import { mkdirp } from "mkdirp";
import * as path from "path";
import * as fs from "fs/promises";

const ACCESS_TOKEN =
  process.argv[process.argv.findIndex((arg) => arg === "--access-token") + 1];

if (!ACCESS_TOKEN) {
  throw new Error("Required --access-token argument");
}

export async function writeFile(path: string, content: Buffer) {
  await mkdirp(path.substring(0, path.lastIndexOf("/")));
  await fs.writeFile(path, content);
}

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

export async function getCompany(id: string) {
  try {
    const data = await axios.get(
      "https://api.timify.com/v1/booker-services/companies",
      {
        params: {
          company_id: id,
        },
      },
    );

    return data.data;
  } catch (e: any) {
    console.log("Failed to get service data");
  }
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

    return data.data;
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

    return data.data;
  } catch (e: any) {
    if (e?.response?.status === 401) {
      throw e;
    }

    console.log("Failed to get appointment data");
  }
}

async function getAllCompanyData(
  company: Record<string, any>,
  companyRoot: string,
) {
  const days = generateDays(7);

  // Process services
  for (const service of company.data.companies[0].services) {
    const data = await getAvailabilities({
      company_id: company.data.companies[0].id,
      service_id: service.id,
      days: days,
    });

    await writeFile(
      path.join(
        companyRoot,
        "bookings",
        "services",
        `${service.id} - ${service.name}.json`,
      ),
      Buffer.from(JSON.stringify(data || {}, null, 4)),
    );
  }

  // Process group services
  for (const groupService of company.data.companies[0].groupServices) {
    if (groupService.categoryId) {
      // Course
      const data = await getAvailabilities({
        company_id: company.data.companies[0].id,
        course_id: groupService.id,
        days,
      });

      await writeFile(
        path.join(
          companyRoot,
          "bookings",
          "courses",
          `${groupService.id} - ${groupService.name}.json`,
        ),
        Buffer.from(JSON.stringify(data || {}, null, 4)),
      );
    } else {
      // Appointment
      const data = await getAppointment({
        company_id: company.data.companies[0].id,
        appointment_id: groupService.id,
      });

      await writeFile(
        path.join(
          companyRoot,
          "bookings",
          "appointments",
          `${groupService.id} - ${groupService.name}.json`,
        ),
        Buffer.from(JSON.stringify(data || {}, null, 4)),
      );
    }
  }
}

async function main(companiesIDs: string[]) {
  const ROOT = path.join(__dirname, "..");
  const DATA_DIRECTORY_NAME = "data";

  // Get companies data
  const companiesData = (
    await Promise.all(
      companiesIDs.map(async (id) => {
        return getCompany(id);
      }),
    )
  ).filter((companyData) => companyData);

  // Write companies to files
  await Promise.all(
    companiesData.map(async (companyData) => {
      const companyName =
        companyData?.data?.companies?.[0]?.name ||
        companyData?.companies?.[0]?.id;
      return writeFile(
        path.join(
          ROOT,
          DATA_DIRECTORY_NAME,
          `${companyName}`,
          `${companyName}.json`,
        ),
        Buffer.from(JSON.stringify(companyData || {}, null, 4)),
      );
    }),
  );

  // Get bookings and write to files
  await Promise.all(
    companiesData.map(async (companyData) => {
      const companyName =
        companyData?.data?.companies?.[0]?.name ||
        companyData?.data?.companies?.[0]?.id;
      return getAllCompanyData(
        companyData,
        path.join(ROOT, DATA_DIRECTORY_NAME, companyName),
      );
    }),
  );
}

const companiesIDs = ["65c39ebd07a04b9210cccb7b", "65ca2bb1c1020b3c67633b1a"];

main(companiesIDs);
