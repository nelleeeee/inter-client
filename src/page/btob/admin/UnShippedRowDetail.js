import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";

const UnShippedRowDetail = ({ match, location }) => {
  const { id } = match.params;
  //   const { orders } = location.state;
  const [orders, setOrders] = useState([]);
  const today = new Date();

  useEffect(() => {
    db.collection("orders")
      .doc("b2b")
      .collection("b2borders")
      .where("customer", "==", id)
      .onSnapshot(snapshot =>
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
      );
  }, [id]);
  return (
    <div>
      row detail
      {orders &&
        console.log(
          id,
          [].concat.apply(
            [],
            orders.map(order =>
              order.data.list.filter(arr => arr.relDate.toDate() > today)
            )
          )
        )}
    </div>
  );
};

export default UnShippedRowDetail;
