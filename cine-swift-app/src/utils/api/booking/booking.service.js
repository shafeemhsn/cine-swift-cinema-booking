import api from "../../axiosInstance";

export const createBooking = async (newBooking) => {
  const { data } = await api.post(`/booking/create-booking`, newBooking);
  return data;
};
