import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";

const UnShippedRow = ({ customer }) => {
  const [orders, setOrders] = useState();

  const today = new Date();

  useEffect(() => {
    db.collection("orders")
      .doc("b2b")
      .collection("b2borders")
      .where("customer", "==", customer)
      .onSnapshot(snapshot =>
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
      );
  }, [customer]);
  return (
    <Link
      to={{
        pathname: `/unshipped/${customer}`,
        state: { orders },
      }}
    >
      <div>
        {customer && customer}
        {orders &&
          orders.reduce((i, c) => {
            return (
              i + c.data.list.filter(arr => arr.relDate.toDate() > today).length
            );
          }, 0)}
      </div>
    </Link>
  );
};

export default UnShippedRow;
