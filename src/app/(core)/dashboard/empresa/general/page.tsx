import GeneralEmpresa from "@/modules/empresa/features/general/general_feat";
import HeaderModule from "@/shared/components/header-module";


export default function EmpresaGeneralPage() {

  return (
    <div className="min-h-screen  p-6">
      <div className="mb-8 flex items-start justify-between">
        <HeaderModule title="Datos de la Empresa" description="Datos de la Empresa" />
      </div>
      <GeneralEmpresa />
    </div>

  )
}