export interface SettingsType {
  id?: number;
  created_at?: string;
  minBookingLength: number;
  maxBookingLength: number; // Nota: Mantive o nome original do campo, mas "Length" está escrito incorretamente
  maxGuestsPerBooking: number;
  breakfastPrice: number;
}
