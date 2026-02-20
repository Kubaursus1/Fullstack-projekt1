import { useFormContext } from "react-hook-form"
import type { RegistrationFormValues } from "@/schemas/registrationSchema"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { CustomRatingControl } from "@/components/form/CustomRatingControl"

export function StepPotwierdzenie() {
  const { watch } = useFormContext<RegistrationFormValues>()
  const values = watch() ?? {}

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
        <p className="font-medium text-foreground">Podsumowanie</p>
        <dl className="mt-2 grid gap-1 [&_dt]:font-medium [&_dd]:text-muted-foreground">
          <div><dt>Imię i nazwisko</dt><dd>{String(values.imie ?? "")} {String(values.nazwisko ?? "")}</dd></div>
          <div><dt>E-mail</dt><dd>{String(values.email ?? "")}</dd></div>
          <div><dt>Adres</dt><dd>{String(values.ulica ?? "")} {String(values.numerDomu ?? "")}, {String(values.kodPocztowy ?? "")} {String(values.miasto ?? "")}</dd></div>
        </dl>
      </div>
      <FormField<RegistrationFormValues>
        name="ocena"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>Ocena zainteresowania warsztatami 1–5 (opcjonalnie)</FormLabel>
            <FormControl>
              <CustomRatingControl
                value={typeof field.value === "number" ? field.value : 0}
                onChange={field.onChange}
                onBlur={field.onBlur}
                max={5}
                aria-invalid={!!fieldState.invalid}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
