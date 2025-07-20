export interface IBooking {
  bookingId?: string;
  userId?: string;
  showtimeId?: string;
  cinemaId: string;
  seatId: string;
  totalAmount?: number;
  status?: string;
}
