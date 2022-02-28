import { ITaxi, ITaxiPost, ITaxiStatus } from "../types/taxi";
import { instance } from "./api";

export const taxiAPI = {
  getTaxi(offset = 1, limit = 6, status = "", created_at = "") {
    return instance
      .get<ITaxi[]>("orders", {
        params: {
          offset,
          limit,
          status,
          created_at,
        },
      })
      .then((response) => response.data);
  },
  createTaxi(order: ITaxiPost) {
    return instance
      .post<ITaxi>("order/new", order)
      .then((response) => response.data);
  },
  updateTaxi(id: string, status: ITaxiStatus) {
    return instance
      .put<ITaxi>(`orders/${id}`, {
        status,
      })
      .then((response) => response.data);
  },
  deleteTaxi(id: string) {
    return instance
      .delete<ITaxi>(`orders/${id}`)
      .then((response) => response.data);
  },
};
