import type { RegistrationFormValues } from "@/schemas/registrationSchema"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function StepAdres() {
  return (
    <div className="flex flex-col gap-4">
      <FormField<RegistrationFormValues>
        name="ulica"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ulica</FormLabel>
            <FormControl>
              <Input placeholder="Marszałkowska" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField<RegistrationFormValues>
        name="numerDomu"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Numer domu</FormLabel>
            <FormControl>
              <Input placeholder="1" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField<RegistrationFormValues>
        name="kodPocztowy"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kod pocztowy</FormLabel>
            <FormControl>
              <Input placeholder="00-001" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField<RegistrationFormValues>
        name="miasto"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Miasto</FormLabel>
            <FormControl>
              <Input placeholder="Warszawa" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField<RegistrationFormValues>
        name="kraj"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kraj (opcjonalnie)</FormLabel>
            <FormControl>
              <Input placeholder="Polska" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
