'use client'

import { useState, useEffect } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shared/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { getCitiesByProvinceAction } from '../../../actions/nueva_actions'

import { CompanyFormData } from '../schemas/companySchema'
import { UseFormReturn } from 'react-hook-form'
interface LocationSelectProps {
  form: UseFormReturn<CompanyFormData>
  fieldName: keyof CompanyFormData
  label: string
  placeholder: string
  options: Array<{ id: string; name: string }>
  disabled?: boolean
  onChange?: (_value: string) => void
  dependsOn?: string
  dependsOnValue?: string
}

export function LocationSelect({
  form,
  fieldName,
  label,
  placeholder,
  options,
  disabled = false,
  onChange,
  dependsOn,
  dependsOnValue,
}: LocationSelectProps) {
  const [open, setOpen] = useState(false)
  const [dynamicOptions, setDynamicOptions] = useState<Array<{ id: string; name: string }>>([])
  const [loading, setLoading] = useState(false)

  // Si es un select dependiente (ciudades que dependen de provincia)
  useEffect(() => {
    if (dependsOn && dependsOnValue) {
      const fetchCities = async () => {
        setLoading(true)
        try {
          const result = await getCitiesByProvinceAction(dependsOnValue)
          if (result.cities) {
            setDynamicOptions(result.cities)
          }
        } catch (error) {
          console.error('Error al cargar ciudades:', error)
          setDynamicOptions([])
        } finally {
          setLoading(false)
        }
      }
      fetchCities()
    } else if (dependsOn && !dependsOnValue) {
      // Si no hay valor en el campo del que depende, limpiar opciones
      setDynamicOptions([])
      form.setValue(fieldName, '')
    }
  }, [dependsOn, dependsOnValue, fieldName, form])

  // Usar opciones dinámicas si hay dependencia, sino las opciones estáticas
  const currentOptions = dependsOn ? dynamicOptions : options

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                  disabled={disabled || (dependsOn && !dependsOnValue) || loading}
                >
                  {field.value
                    ? currentOptions.find((option) => option.id === field.value)?.name
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder={`Buscar ${label.toLowerCase()}...`}
                  autoFocus={false}
                  className="focus:ring-0 focus:ring-offset-0 border-none focus:outline-none"
                />
                <CommandList>
                  <CommandEmpty>
                    {loading ? "Cargando..." : `No se encontraron ${label.toLowerCase()}`}
                  </CommandEmpty>
                  <CommandGroup>
                    {currentOptions.map((option) => (
                      <CommandItem
                        value={option.name}
                        key={option.id}
                        onSelect={() => {
                          form.setValue(fieldName, option.id)
                          setOpen(false)
                          if (onChange) {
                            onChange(option.id)
                          }
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            option.id === field.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}