import { z } from "zod"

const KOD_POCZTOWY_REGEX = /^\d{2}-\d{3}$/

const TYLKO_LITERY_REGEX = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const stepDaneOsoboweSchema = z.object({
  imie: z
    .string()
    .min(2, "Imię musi mieć co najmniej 2 znaki.")
    .regex(TYLKO_LITERY_REGEX, "Imię może zawierać tylko litery, spacje lub myślnik."),
  nazwisko: z
    .string()
    .min(2, "Nazwisko musi mieć co najmniej 2 znaki.")
    .regex(TYLKO_LITERY_REGEX, "Nazwisko może zawierać tylko litery, spacje lub myślnik."),
  email: z
    .string()
    .min(1, "Adres e-mail jest wymagany.")
    .regex(EMAIL_REGEX, "Podaj prawidłowy adres e-mail."),
  dataUrodzenia: z
    .string()
    .min(1, "Data urodzenia jest wymagana.")
    .refine(
      (val) => {
        const date = new Date(val)
        const today = new Date()
        const minAge = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
        const maxAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
        return !Number.isNaN(date.getTime()) && date >= minAge && date <= maxAge
      },
      { message: "Musisz mieć ukończone 18 lat (data w formacie RRRR-MM-DD)." }
    ),
})

const stepAdresSchema = z.object({
  ulica: z.string().min(2, "Ulica musi mieć co najmniej 2 znaki."),
  numerDomu: z.string().min(1, "Numer domu jest wymagany."),
  kodPocztowy: z
    .string()
    .regex(KOD_POCZTOWY_REGEX, "Kod pocztowy w formacie XX-XXX (np. 00-001)."),
  miasto: z
    .string()
    .min(2, "Nazwa miasta musi mieć co najmniej 2 znaki.")
    .regex(TYLKO_LITERY_REGEX, "Miasto może zawierać tylko litery, spacje lub myślnik."),
  kraj: z.string().optional(),
})

const stepPotwierdzenieSchema = z.object({
  ocena: z.number().min(1).max(5),
})

export const registrationSchema = z
  .object({
    ...stepDaneOsoboweSchema.shape,
    ...stepAdresSchema.shape,
    ...stepPotwierdzenieSchema.shape,
  })
  .refine(
    (data) => {
      if (data.kraj === "Polska" || data.kraj === "" || !data.kraj) {
        return KOD_POCZTOWY_REGEX.test(data.kodPocztowy ?? "")
      }
      return true
    },
    { message: "Dla Polski kod pocztowy musi być w formacie XX-XXX.", path: ["kodPocztowy"] }
  )

export type RegistrationFormValues = z.infer<typeof registrationSchema>
