import { createContext, useContext, useState, type ReactNode } from 'react';

type BookingContextType = {
  open: boolean;
  openBooking: (presetService?: string) => void;
  closeBooking: () => void;
  presetService?: string;
};

const BookingContext = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [presetService, setPresetService] = useState<string | undefined>(undefined);

  const openBooking = (service?: string) => {
    setPresetService(service);
    setOpen(true);
  };
  const closeBooking = () => setOpen(false);

  return (
    <BookingContext.Provider value={{ open, openBooking, closeBooking, presetService }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used within BookingProvider');
  return ctx;
}
