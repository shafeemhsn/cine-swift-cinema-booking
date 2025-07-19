import api from "../../axiosInstance";

export const getSeats = async () => {
  const { data } = await api.get(`/seats/get-seats`);
  return data;
};
