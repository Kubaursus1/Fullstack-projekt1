import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getWymaganePola, type FormStepId } from "@/types/form";
import {
  registrationSchema,
  type RegistrationFormValues,
} from "@/schemas/registrationSchema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { StepDaneOsobowe } from "@/components/form/StepDaneOsobowe";
import { StepAdres } from "@/components/form/StepAdres";
import { StepPotwierdzenie } from "@/components/form/StepPotwierdzenie";
import { ChevronLeft, ChevronRight } from "lucide-react";

const STEPS: { id: FormStepId; label: string }[] = [
  { id: "dane-osobowe", label: "Dane osobowe" },
  { id: "adres", label: "Adres" },
  { id: "potwierdzenie", label: "Potwierdzenie" },
];

const defaultValues: Partial<RegistrationFormValues> = {
  imie: "",
  nazwisko: "",
  email: "",
  dataUrodzenia: "",
  ulica: "",
  numerDomu: "",
  kodPocztowy: "",
  miasto: "",
  kraj: "",
  ocena: 0,
};

interface RegistrationFormProps {
  onSuccess?: () => void;
}

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
    mode: "onChange",
  });

  const goNext = useCallback(async () => {
    if (currentStepIndex >= STEPS.length) return;

    if (currentStepIndex === 0) {
      const fieldNames = getWymaganePola(
        "dane-osobowe",
      ) as (keyof RegistrationFormValues)[];
      const valid = await form.trigger(fieldNames);
      if (valid) setCurrentStepIndex(1);
      return;
    }

    if (currentStepIndex === 1) {
      setCurrentStepIndex(2);
    }
  }, [form, currentStepIndex]);

  const goBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  }, [currentStepIndex]);

  const handleSubmit = (data: RegistrationFormValues) => {
    console.log("Zapisano:", data);
    form.reset(defaultValues);
    onSuccess?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex items-center justify-between gap-2 border-b border-border pb-2">
          {STEPS.map((step, index) => (
            <span
              key={step.id}
              className={`text-sm font-medium transition-colors ${
                index === currentStepIndex
                  ? "text-primary"
                  : index < currentStepIndex
                    ? "text-muted-foreground"
                    : "text-muted-foreground/70"
              }`}
            >
              {index + 1}. {step.label}
            </span>
          ))}
        </div>
        <div className="text-xs text-muted-foreground">
          Aktualny krok: {currentStepIndex + 1} / {STEPS.length}
        </div>

        <div className="min-h-50 animate-fade-slide-in">
          {currentStepIndex === 0 && <StepDaneOsobowe />}
          {currentStepIndex === 1 && <StepAdres />}
          {currentStepIndex === 2 && <StepPotwierdzenie />}
        </div>

        <div className="flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            disabled={currentStepIndex === 0}
            className="group focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-accent"
          >
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Wstecz
          </Button>
          {currentStepIndex}
          {currentStepIndex < STEPS.length - 1 ? (
            <Button type="button" onClick={goNext}>
              Dalej
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" className="active:scale-[0.98]">
              Zapisz
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
