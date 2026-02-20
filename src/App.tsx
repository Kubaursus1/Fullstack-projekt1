import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { RegistrationForm } from "@/components/form/RegistrationForm"
import { AreaChartDemo } from "@/components/charts/AreaChartDemo"
import { UserPlus } from "lucide-react"

function App() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const defaultChartData = [
    { month: "Sty", wartosc: 186, zapytania: 80 },
    { month: "Lut", wartosc: 305, zapytania: 200 },
    { month: "Mar", wartosc: 237, zapytania: 120 },
    { month: "Kwi", wartosc: 73, zapytania: 190 },
    { month: "Maj", wartosc: 209, zapytania: 130 },
    { month: "Cze", wartosc: 214, zapytania: 140 },
  ]

  const [chartData, setChartData] = useState(() => {
    const saved = localStorage.getItem("chartData")
    return saved ? JSON.parse(saved) : defaultChartData
  })

  useEffect(() => {
    localStorage.setItem("chartData", JSON.stringify(chartData))
  }, [chartData])

  const handleNewRegistration = () => {
    console.log("Aktualizuję wykres!")
    setChartData((prev: { month: string, wartosc: number, zapytania: number}[]) => {
      const newData = [...prev]
      const lastIndex = newData.length - 1
      newData[lastIndex] = {
        ...newData[lastIndex],
        wartosc: newData[lastIndex].wartosc + 1,
      }
      return newData
    })
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4 md:mb-12">
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Zapisy na warsztaty
            </h1>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="group focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/90 active:bg-primary/80"
                  >
                    <UserPlus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Akcje
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => {
                      setDialogOpen(true)
                    }}
                  >
                    Zapisz się na warsztaty
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }}
                  >
                    Przewiń do góry
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="space-y-8">
            <Card className="group overflow-hidden border-border transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg md:text-xl">
                  Liczba zapisów w ostatnich miesiącach
                </CardTitle>
                <CardDescription>
                  Wykres obszarowy – zapytania i potwierdzone zapisy.
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <AreaChartDemo data={chartData} />
              </CardContent>
            </Card>

            <Card className="border-border transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <CardHeader>
                <CardTitle>Zapisz się na warsztaty</CardTitle>
                <CardDescription>
                  Wypełnij formularz w trzech krokach (dane, adres, podsumowanie).
                  Możesz wracać i edytować pola.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DialogTrigger asChild>
                        <Button
                          className="w-full sm:w-auto focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/90 active:scale-[0.98]"
                        >
                          <UserPlus className="mr-2 h-4 w-4" />
                          Wypełnij formularz zapisu
                        </Button>
                      </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Otwiera formularz w oknie dialogowym</p>
                    </TooltipContent>
                  </Tooltip>
                  <DialogContent className="max-h-[90vh] overflow-y-auto animate-fade-slide-in sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Formularz zapisu na warsztaty</DialogTitle>
                      <DialogDescription>
                        Krok 1: dane osobowe, krok 2: adres, krok 3: podsumowanie i ocena.
                        Przycisk „Dalej” jest aktywny, gdy dany krok jest poprawnie wypełniony.
                      </DialogDescription>
                    </DialogHeader>
                    <RegistrationForm
                      onSuccess={() => {
                        handleNewRegistration()
                        setDialogOpen(false)
                      }}
                    />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}

export default App