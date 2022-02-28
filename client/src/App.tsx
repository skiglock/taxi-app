import React, { useEffect } from "react";
import { useAppActions } from "./hooks/useAppActions";
import { useAppSelector } from "./hooks/useAppSelector";

const App = () => {
  const { orders, error } = useAppSelector((state) => state.taxi);
  const { fetchTaxi, deleteTaxi, updateTaxi, createTaxi } = useAppActions();

  useEffect(() => {
    fetchTaxi(0, 0, "", "");
  }, []);

  const data = {
    phone: "+7 (998) 408-3437",
    adress_from: {
      latitude: 37.659009,
      longitude: -15.284495,
      description:
        "Anim pariatur non irure aliquip. Elit incididunt eu velit esse reprehenderit sunt ea aute sint eiusmod cupidatat velit. Pariatur duis sunt elit nostrud cupidatat fugiat qui veniam est laboris dolore ut. Enim minim excepteur minim irure nulla voluptate exercitation irure sit eu aliqua occaecat.\r\n",
    },
    adress_where: {
      latitude: 60.078931,
      longitude: 10.446349,
      description:
        "Consectetur ad consequat consectetur id ea commodo veniam adipisicing eu irure. Enim est excepteur consectetur do in fugiat dolore dolor. Mollit quis et officia culpa veniam consectetur ad minim qui nostrud occaecat.\r\n",
    },
  };
  return (
    <div>
      {error}
      {orders.map((order) => (
        <div key={order.id}>
          <div>{order.phone}</div>
          <div>{order.adress_from.latitude}</div>
          <div>{order.adress_from.longitude}</div>
          <div>{order.adress_from.description}</div>
          <div>{order.adress_where.latitude}</div>
          <div>{order.adress_where.longitude}</div>
          <div>{order.adress_where.description}</div>
          <div>{order.status}</div>
          <button onClick={() => deleteTaxi(order.id)}>Удалить</button>
          <button onClick={() => updateTaxi(order.id, "NEW")}>Статус</button>
          <button onClick={() => createTaxi(data)}>Создать</button>
        </div>
      ))}
    </div>
  );
};

export default App;
