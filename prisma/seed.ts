// prisma/seed.ts
import "dotenv/config";
import { PrismaClient } from "@/generated/client"
import { readFileSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();

type ProvinceJson = {
  name: string;
  id: string;
};

type CityJson = {
  name: string;
  id: string;
  province_id: string;
};

async function main() {
  const provincesPath = join(__dirname, "provinces_rows_complet.json");
  const provincesRaw = readFileSync(provincesPath, "utf-8");
  const provincesJson = JSON.parse(provincesRaw) as ProvinceJson[];

  const now = new Date();
  const provinces = provincesJson.map((p) => ({
    name: p.name,
    id: p.id,
    created_at: now,
    updated_at: now,
  }));

  await prisma.province.createMany({
    data: provinces,
    skipDuplicates: true,
  });

  const citiesPath = join(__dirname, "cities_rows.json");
  const citiesRaw = readFileSync(citiesPath, "utf-8");
  const citiesJson = JSON.parse(citiesRaw) as CityJson[];

  // const citiesTucPath = join(__dirname, "cities_rows_tuc.json");
  // const citiesTucRaw = readFileSync(citiesTucPath, "utf-8");
  // const citiesTucJson = JSON.parse(citiesTucRaw) as CityJson[];

  // const allCitiesJson = [...citiesRnJson, ...citiesTucJson];

  const cities = citiesJson.map((c) => ({
    name: c.name,
    id: c.id,
    province_id: c.province_id,
    created_at: now,
    updated_at: now,
  }));

  await prisma.city.createMany({
    data: cities,
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error("Error en seed de provincias:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });