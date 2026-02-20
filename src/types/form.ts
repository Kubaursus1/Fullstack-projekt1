export type FormStepId = "dane-osobowe" | "adres" | "potwierdzenie"

interface DaneOsoboweBaza {
  imie: string
  nazwisko: string
  email: string
  dataUrodzenia: string
}

interface Adres {
  ulica: string
  numerDomu: string
  kodPocztowy: string
  miasto: string
  kraj?: string
}

export function getWymaganePola(step: "dane-osobowe"): (keyof DaneOsoboweBaza)[]
export function getWymaganePola(step: "adres"): (keyof Adres)[]
export function getWymaganePola(step: "potwierdzenie"): string[]
export function getWymaganePola(step: FormStepId): string[]
export function getWymaganePola(step: FormStepId): string[] {
  if (step === "dane-osobowe") return ["imie", "nazwisko", "email", "dataUrodzenia"]
  if (step === "adres") return ["ulica", "numerDomu", "kodPocztowy", "miasto"]
  return ["ocena"]
}

export type WynikWalidacji =
  | { success: true; data: DaneOsoboweBaza & Adres }
  | { success: false; errors: Record<string, string> }

export function isWalidacjaSukces(
  wynik: WynikWalidacji
): wynik is { success: true; data: DaneOsoboweBaza & Adres } {
  return wynik.success === true
}
