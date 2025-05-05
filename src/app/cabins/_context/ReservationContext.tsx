"use client";

import { createContext, useContext, useState } from "react";

/**
 * Representa o intervalo de datas de uma reserva
 * @property {Date | null} from - Data de início da reserva
 * @property {Date | null} to - Data de término da reserva
 */
type DateRange = {
  from: Date | null;
  to: Date | null;
};

/**
 * Interface do contexto de reserva
 */
interface ReservationContextType {
  /** Intervalo de datas selecionado */
  range: DateRange;
  /** Função para atualizar o intervalo de datas */
  setRange: React.Dispatch<React.SetStateAction<DateRange>>;
  /** Função para resetar o intervalo de datas */
  resetRange: () => void;
  /** Verifica se o intervalo de datas está completo */
  isRangeComplete: boolean;
}

const initialState: DateRange = { from: null, to: null };

const ReservationContext = createContext<ReservationContextType | undefined>(undefined);

function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [range, setRange] = useState<DateRange>(initialState);
  const resetRange = () => setRange(initialState);
  
  // Propriedade computada para verificar se o intervalo está completo
  const isRangeComplete = Boolean(range.from && range.to);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange, isRangeComplete }}>
      {children}
    </ReservationContext.Provider>
  );
}

/**
 * Hook personalizado para acessar o contexto de reserva
 * @throws {Error} Se usado fora do ReservationProvider
 */
function useReservation(): ReservationContextType {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("useReservation deve ser usado dentro de um ReservationProvider");
  return context;
}

export { ReservationProvider, useReservation };
export type { DateRange };
