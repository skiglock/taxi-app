import { ITaxi, ITaxiPost, ITaxiResponse, TTaxiStatus } from "../types/taxi";
import { instance } from "./api";

export const taxiAPI = {
  getTaxi(page = 1, limit = 6, status = "", sort = "") {
    return instance
      .get<ITaxiResponse>("orders", {
        params: {
          page,
          limit,
          status,
          sort,
        },
      })
      .then((response) => response.data);
  },
  createTaxi(order: ITaxiPost) {
    return instance
      .post<ITaxi>("order/new", order)
      .then((response) => response.data);
  },
  updateTaxi(id: string, status: TTaxiStatus) {
    return instance
      .put<ITaxi>(`orders/${id}`, {
        status,
      })
      .then((response) => response.data);
  },
  deleteTaxi(id: string) {
    return instance
      .delete<ITaxiResponse>(`orders/${id}`)
      .then((response) => response.data);
  },
};
