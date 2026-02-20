import type { RegistrationFormValues } from "@/schemas/registrationSchema"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export function StepDaneOsobowe() {
  return (
    <div className="flex flex-col gap-4">
      <FormField<RegistrationFormValues>
        name="imie"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Imię</FormLabel>
            <FormControl>
              <Input placeholder="Jan" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField<RegistrationFormValues>
        name="nazwisko"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nazwisko</FormLabel>
            <FormControl>
              <Input placeholder="Kowalski" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField<RegistrationFormValues>
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>E-mail</FormLabel>
            <FormControl>
              <Input type="email" placeholder="jan@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField<RegistrationFormValues>
        name="dataUrodzenia"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Data urodzenia</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
