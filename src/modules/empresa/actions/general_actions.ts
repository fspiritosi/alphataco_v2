// Acciones para el submódulo de información general de la empresa
// Aquí irían las funciones para obtener y actualizar datos generales de la empresa

import  prisma from "@/lib/db";

export const getCompanyData = async ({user}: {user: any}) => {
  const currentUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!currentUser) {
    throw new Error("Usuario no encontrado");
  }
  const company = await prisma.company.findUnique({
    where: {
      id: currentUser.current_company_id!,
    },
    select: {
      id: true,
      name: true,
      description: true,
      cuit: true,
      phone: true,
      email: true,
      website: true,
      address: true,
      city: {
        select: {
          name: true,
        },
      },
      province: {
        select: {
          name: true,
        },
      },
      country: true,
      is_active: true,
      logo: true,
    },
  });

  return company;
};
export type getCompanyDataType = Awaited<ReturnType<typeof getCompanyData>>;

// export const getProvinceById = async (provinceId: string) => {

//   const province = await prisma.province.findUnique({
//     where: {
//       id: provinceId,
//     },
//   });

//   return province;
// };
// export type getProvinceByIdType = Awaited<ReturnType<typeof getProvinceById>>;
