import { z } from "zod";

// Esquema de validación para el formulario de empresa
export const companyFormSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre de la empresa es requerido")
    .max(100, "El nombre no puede exceder 100 caracteres"),

  description: z.string().or(z.literal("")),

  email: z
    .string()
    .min(1, "El email es requerido")
    .email("Formato de email inválido")
    .max(255, "El email no puede exceder 255 caracteres"),

  phone: z.string().or(z.literal("")),

  website: z
    .string()
    .url("Formato de URL inválido (debe comenzar con http:// o https://)")
    .optional()
    .or(z.literal("")),

  address: z.string().or(z.literal("")),

  country: z.string().min(1, "El país es requerido"),

  cuit: z
    .string()
    .min(1, "El CUIT es requerido")
    .regex(
      /^\d{2}-\d{8}-\d$/,
      "Formato de CUIT inválido (debe ser XX-XXXXXXXX-X)"
    )
    .or(z.string().min(1, "El CUIT es requerido")),

  province_id: z
    .string()
    .min(1, "La provincia es requerida"),

  city_id: z
    .string()
    .min(1, "La ciudad es requerida"),

  logo: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "El archivo no debe superar los 5MB"
    )
    .refine(
      (file) => !file || file.type.startsWith("image/"),
      "El archivo debe ser una imagen"
    ),
});

// Tipo inferido del esquema
export type CompanyFormData = z.infer<typeof companyFormSchema>;

// Valores por defecto del formulario
export const defaultCompanyFormValues: CompanyFormData = {
  name: "",
  description: "",
  email: "",
  phone: "",
  website: "",
  address: "",
  country: "Argentina",
  cuit: "",
  province_id: "",
  city_id: "",
  logo: undefined,
};
