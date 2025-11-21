import NuevaFeat from "@/modules/empresa/features/nueva/_nueva_feat";
import { getCompanyByIdAction } from "@/modules/empresa/actions/nueva_actions";

interface EmpresaEditarPageProps {
    params:Promise<{id: string}>;
}

export default async function EmpresaEditarPage({ params }: EmpresaEditarPageProps) {
    const id = await params;
    if (!id.id) {
        return <div>Empresa no encontrada</div>;
    }
  const company = await getCompanyByIdAction(id.id);

  if (!company) {
    // Podrías redirigir o mostrar un estado de error más amigable
    return <div>Empresa no encontrada</div>;
  }

  const initialValues = {
    name: company.name,
    description: company.description ?? "",
    email: company.email ?? "",
    phone: company.phone ?? "",
    website: company.website ?? "",
    address: company.address ?? "",
    country: company.country ?? "Argentina",
    cuit: company.cuit,
    province_id: company.province_id,
    city_id: company.city_id,
    logo: undefined,
  } as const;

  return (
    <NuevaFeat
      mode="edit"
      initialValues={initialValues}
      initialLogoUrl={company.logo}
      companyId={company.id}
    />
  );
}
