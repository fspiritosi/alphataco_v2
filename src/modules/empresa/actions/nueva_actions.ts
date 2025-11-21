"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import {
  companyFormSchema,
  type CompanyFormData,
} from "../features/nueva/schemas/companySchema";
import {ensureUserFromClerk} from "@/shared/actions/user";
import { uploadFile } from "@/lib/cloudfare";


export async function createCompanyAction(
  formData: CompanyFormData,
  logoUrl?: string
) {
  const user = await ensureUserFromClerk();
  try {
    // Validar los datos con Zod (sin el logo que ahora se maneja por separado)
    const validatedData = companyFormSchema.parse(formData);
    const { logo: _, ...dataWithoutLogo } = validatedData;

    

    // Preparar los datos para insertar
    const companyData = {
      name: dataWithoutLogo.name,
      description: dataWithoutLogo.description,
      website: dataWithoutLogo.website,
      email: dataWithoutLogo.email,
      phone: dataWithoutLogo.phone,
      address: dataWithoutLogo.address,
      country: dataWithoutLogo.country,
      cuit: dataWithoutLogo.cuit,
      province_id: dataWithoutLogo.province_id,
      city_id: dataWithoutLogo.city_id,
      is_active: true,
      logo: logoUrl || null, // Usar la URL del logo subida
      owner_id: user!.id,
    };

    // Insertar la empresa
    console.log("Insertando empresa con datos:", companyData);
    const company = await prisma.company.create({
      data: companyData,
    });
      

    if (!company) {
      console.error("Error al crear empresa:");
      return { success: false, error: "Error al crear la empresa" };
    }

    // Revalidar la caché
    revalidatePath("/dashboard");

    return { success: true, data: company };
  } catch (error) {
    console.error("Error en createCompanyAction:", error);

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Error desconocido al crear la empresa" };
  }
}

export async function getProvincesAction() {
  try {
    const provinces = await prisma.province.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return { provinces, error: null };
  } catch (error) {
    console.error("Error en getProvincesAction:", error);
    return { provinces: [], error: "Error al obtener provincias" };
  }
}

export type GetProvincesActionType = Awaited<
  ReturnType<typeof getProvincesAction>
>;

export async function getCitiesByProvinceAction(provinceId: string) {
  try {
    const cities = await prisma.city.findMany({
      where: {
        province_id: provinceId,
      },
      orderBy: {
        name: "asc",
      },
    });

    return { cities, error: null };
  } catch (error) {
    console.error("Error en getCitiesByProvinceAction:", error);
    return { cities: [], error: "Error al obtener ciudades" };
  }
}

export type GetCitiesByProvinceActionType = Awaited<
  ReturnType<typeof getCitiesByProvinceAction>
>;

export async function uploadCompanyLogoAction(formData: FormData) {
  try {
    const file = formData.get("file") as File | null;

    if (!file) {
      return { success: false, error: "No se recibió ningún archivo" };
    }

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    const originalName = file.name || "logo";
    const extension = originalName.includes(".")
      ? originalName.split(".").pop()
      : "png";

    const fileName = `company-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}.${extension}`;

    const publicUrl = await uploadFile(bytes, fileName);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error("Error en uploadCompanyLogoAction:", error);
    return { success: false, error: "Error al subir la imagen" };
  }
}
