'use client'
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"
import { Building2, Upload, X } from "lucide-react"
import HeaderModule from "@/shared/components/header-module"
import { companyFormSchema, type CompanyFormData, defaultCompanyFormValues } from "./schemas/companySchema"
import { createCompanyAction, getProvincesAction, updateCompanyAction } from "../../actions/nueva_actions"
import { useCloudfareImage } from "./hooks/useCloudfareImage"
import { LocationSelect } from "./components/LocationSelect"

const countries = [
    "Argentina",
    "Bolivia",
    "Brasil",
    "Chile",
    "Colombia",
    "Costa Rica",
    "Cuba",
    "Ecuador",
    "El Salvador",
    "España",
    "Guatemala",
    "Honduras",
    "México",
    "Nicaragua",
    "Panamá",
    "Paraguay",
    "Perú",
    "Puerto Rico",
    "República Dominicana",
    "Uruguay",
    "Venezuela",
]

type NuevaFeatProps = {
    mode?: "create" | "edit";
    initialValues?: Partial<CompanyFormData>;
    initialLogoUrl?: string | null;
    companyId?: string;
};

function NuevaFeat({ mode = "create", initialValues, initialLogoUrl, companyId }: NuevaFeatProps) {
    const router = useRouter()

    const isEditMode = mode === "edit";

    const form = useForm<CompanyFormData>({
        resolver: zodResolver(companyFormSchema),
        defaultValues: initialValues
            ? { ...defaultCompanyFormValues, ...initialValues }
            : defaultCompanyFormValues,
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [provinces, setProvinces] = useState<Array<{ id: string; name: string }>>([])

    // Cargar provincias al montar el componente
    useEffect(() => {
        const loadProvinces = async () => {
            const result = await getProvincesAction()
            if (result.provinces) {
                setProvinces(result.provinces)
            }
        }
        loadProvinces()
    }, [])

    // Hook para manejar la imagen de la empresa
    const {
        imageFile,
        imagePreview,
        isUploading,
        handleImageSelect,
        handleImageRemove,
        uploadImage
    } = useCloudfareImage({ existingImageUrl: initialLogoUrl ?? null })

    const onSubmit = async (data: CompanyFormData) => {
        try {
            setIsSubmitting(true)

            let logoUrl: string | undefined

            // Si hay una imagen seleccionada, subirla primero
            if (imageFile) {
                const uploadedUrl = await uploadImage()
                if (uploadedUrl) {
                    logoUrl = uploadedUrl
                } else {
                    alert("Error al subir la imagen. Por favor, intente nuevamente.")
                    setIsSubmitting(false)
                    return
                }
            }

            // Crear o actualizar la empresa con la URL del logo
            let result;

            if (isEditMode && companyId) {
                result = await updateCompanyAction(companyId, data, logoUrl ?? initialLogoUrl ?? undefined)
            } else {
                result = await createCompanyAction(data, logoUrl)
            }

            if (result.success) {
                alert(isEditMode ? "Empresa actualizada exitosamente" : "Empresa creada exitosamente")
                router.push("/dashboard")
            } else {
                alert(`Error: ${result.error}`)
            }
        } catch (error) {
            console.error("Error al crear empresa:", error)
            alert("Error al crear la empresa")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="mx-auto">
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                            <Building2 className="h-6 w-6 text-primary" />
                        </div>
                        {mode === "edit" ? (
                            <HeaderModule title="Editar Empresa" description="Completa los datos para editar una empresa" />
                        ) : (
                            <HeaderModule title="Nueva Empresa" description="Completa los datos para registrar una nueva empresa" />
                        )}
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card className="border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-foreground">Información de la Empresa</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    Los campos marcados con * son obligatorios
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                Logo Upload
                                <FormField
                                    control={form.control}
                                    name="logo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Logo de la Empresa</FormLabel>
                                            <FormControl>
                                                <div className="flex items-start gap-4">
                                                    {imagePreview ? (
                                                        <div className="relative">
                                                            <img
                                                                src={imagePreview || "/placeholder.svg"}
                                                                alt="Logo preview"
                                                                className="h-24 w-24 rounded-lg border border-border object-cover"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    handleImageRemove()
                                                                    field.onChange(undefined)
                                                                }}
                                                                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <label
                                                            htmlFor="logo"
                                                            className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 transition-colors hover:bg-muted"
                                                        >
                                                            <Upload className="h-6 w-6 text-muted-foreground" />
                                                            <span className="mt-1 text-xs text-muted-foreground">Subir</span>
                                                        </label>
                                                    )}
                                                    <div className="flex-1">
                                                        <Input
                                                            id="logo"
                                                            type="file"
                                                            accept="image/*"
                                                            className="hidden"
                                                            onChange={(e) => {
                                                                const file = e.target.files?.[0]
                                                                if (file) {
                                                                    field.onChange(file)
                                                                    handleImageSelect(file)
                                                                }
                                                            }}
                                                        />
                                                        <p className="text-sm text-muted-foreground">
                                                            Formatos aceptados: JPG, PNG, GIF. Tamaño máximo: 5MB
                                                        </p>
                                                        {isUploading && (
                                                            <p className="text-sm text-primary mt-1">
                                                                Subiendo imagen...
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre de la Empresa *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ej: Acme Corporation"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Description */}
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descripción</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Describe brevemente la empresa y su actividad principal"
                                                    rows={4}
                                                    className="resize-none"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email and Phone */}
                                <div className="grid gap-6 md:grid-cols-2">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email *</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="contacto@empresa.com"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Teléfono</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="tel"
                                                        placeholder="+54 11 1234-5678"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                {/* Website */}
                                <FormField
                                    control={form.control}
                                    name="website"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sitio Web</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="url"
                                                    placeholder="https://www.empresa.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Address */}
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Dirección</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Calle, número, ciudad, código postal"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                                    <FormField
                                        control={form.control}
                                        name="country"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>País *</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Selecciona un país" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {countries.map((country) => (
                                                            <SelectItem key={country} value={country}>
                                                                {country}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <LocationSelect
                                        form={form}
                                        fieldName="province_id"
                                        label="Provincia *"
                                        placeholder="Selecciona una provincia"
                                        options={provinces}
                                        onChange={() => {
                                            // Reset city when province changes
                                            form.setValue('city_id', '')
                                        }}
                                    />

                                    <LocationSelect
                                        form={form}
                                        fieldName="city_id"
                                        label="Ciudad *"
                                        placeholder="Selecciona una ciudad"
                                        options={[]}
                                        dependsOn="province_id"
                                        dependsOnValue={form.watch('province_id')}
                                        disabled={!form.watch('province_id')}
                                    />
                                </div>

                                {/* CUIT */}
                                <FormField
                                    control={form.control}
                                    name="cuit"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CUIT *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="XX-XXXXXXXX-X"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Action Buttons */}
                        <div className="mt-6 flex justify-end gap-3">
                            <Link href="/dashboard">
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </Link>
                            <Button type="submit" disabled={isSubmitting}>
                                {isEditMode
                                    ? isSubmitting ? "Guardando..." : "Guardar Cambios"
                                    : isSubmitting ? "Creando..." : "Crear Empresa"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </main>
    )
}

export default NuevaFeat