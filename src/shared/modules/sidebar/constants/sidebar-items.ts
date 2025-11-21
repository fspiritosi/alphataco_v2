import {
  AudioWaveform,
  Building2,
  Calendar,
  ClipboardList,
  Command,
  FileText,
  Frame,
  GalleryVerticalEnd,
  HelpCircle,
  LayoutDashboard,
  MapIcon,
  PieChart,
  Settings,
  Shield,
  Users,
  Wrench,
  CircleDollarSign,
  Factory,
  
} from "lucide-react";








// This is sample data.
export const sidebarItems = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Empresa",
      url: "/dashboard/empresa/general",
      icon: Building2,
      items: [
        {
          title: "General",
          url: "/dashboard/empresa/general",
        },
        {
          title: "Documentación",
          url: "/dashboard/empresa/documentacion",
        },
        {
          title: "Usuarios",
          url: "/dashboard/empresa/usuarios",
        },
        {
          title: "Convenios colectivos de trabajo",
          url: "/dashboard/empresa/convenios-colectivos",
        },
        {
          title: "Permisos",
          url: "/dashboard/empresa/permisos",
        },
        {
          title: "Portal de Empleados",
          url: "/dashboard/empresa/portal-empleados",
        },
      ],
    },
    {
      title: "Empleados",
      url: "/dashboard/empleados/lista",
      icon: Users,
      items: [
        {
          title: "Lista de Empleados",
          url: "/dashboard/empleados/lista",
        },
        {
          title: "Documentos de empleados",
          url: "/dashboard/empleados/documentos",
        },
        {
          title: "Diagramas",
          url: "/dashboard/empleados/diagramas",
        },
        {
          title: "Tipos de documentos",
          url: "/dashboard/empleados/tipos-documentos",
        },
        {
          title: "Convenios colectivos de trabajo",
          url: "/dashboard/empleados/convenios-colectivos",
        },
        {
          title: "Configuración",
          url: "/dashboard/empleados/configuracion",
        },
      ],
    },
    {
      title: "Equipos",
      url: "/dashboard/equipos/lista",
      icon: Settings,
      items: [
        {
          title: "Lista de Equipos",
          url: "/dashboard/equipos/lista",
        },
        {
          title: "Documentos de equipos",
          url: "/dashboard/equipos/documentos",
        },
        {
          title: "Tipos de documentos",
          url: "/dashboard/equipos/tipos-documentos",
        },
        {
          title: "Mantenimiento",
          url: "/dashboard/equipos/mantenimiento",
        },
      ],
    },
    {
      title: "Comercial",
      url: "/dashboard/comercial/clientes",
      icon: CircleDollarSign,
      items: [
        {
          title: "Clientes",
          url: "/dashboard/comercial/clientes",
        },
        {
          title: "Contactos",
          url: "/dashboard/comercial/contactos",
        },
        {
          title: "Contratos",
          url: "/dashboard/comercial/contratos",
        },
        {
          title: "Ventas",
          url: "/dashboard/comercial/ventas",
        },
      ],
    },
    {
      title: "Documentación",
      url: "/dashboard/documentacion/empleados",
      icon: FileText,
      items: [
        {
          title: "Documentos de empleados",
          url: "/dashboard/documentacion/empleados",
        },
        {
          title: "Documentos de equipos",
          url: "/dashboard/documentacion/equipos",
        },
        {
          title: "Documentos de empresa",
          url: "/dashboard/documentacion/empresa",
        },
        {
          title: "Tipos de documentos",
          url: "/dashboard/documentacion/tipos-documentos",
        },
      ],
    },
    {
      title: "Mantenimiento",
      url: "/dashboard/mantenimiento/solicitudes-activas",
      icon: Wrench,
      items: [
        {
          title: "Solicitudes activas",
          url: "/dashboard/mantenimiento/solicitudes-activas",
        },
        {
          title: "Nueva solicitud",
          url: "/dashboard/mantenimiento/nueva-solicitud",
        },
        {
          title: "Tipos de reparaciones",
          url: "/dashboard/mantenimiento/tipos-reparaciones",
        },
      ],
    },
    {
      title: "Formularios",
      url: "/dashboard/formularios/tipos-checklist",
      icon: ClipboardList,
      items: [
        {
          title: "Tipos de checklist",
          url: "/dashboard/formularios/tipos-checklist",
        },
      ],
    },
    {
      title: "Operaciones",
      url: "/dashboard/operaciones/partes-diarios",
      icon: Factory,
      items: [
        {
          title: "Partes diarios",
          url: "/dashboard/operaciones/partes-diarios",
        },
        {
          title: "Detalle de partes diarios",
          url: "/dashboard/operaciones/detalle-partes-diarios",
        },
      ],
    },
    {
      title: "HSE",
      url: "/dashboard/hse/capacitaciones",
      icon: Shield,
      items: [
        {
          title: "Capacitaciones",
          url: "/dashboard/hse/capacitaciones",
        },
        {
          title: "Documentos",
          url: "/dashboard/hse/documentos",
        },
        {
          title: "Etiquetas",
          url: "/dashboard/hse/etiquetas",
        },
        {
          title: "Tipos de documentos",
          url: "/dashboard/hse/tipos-documentos",
        },
      ],
    },
    {
      title: "Ayuda",
      url: "/dashboard/ayuda",
      icon: HelpCircle,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: MapIcon,
    },
  ],
};
