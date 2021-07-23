import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import UnShippedRow from "./UnShippedRow";

const UnShipped = () => {
  const [customers, setCustomers] = useState();

  useEffect(() => {
    db.collection("accounts")
      .where("type", "==", "customer")
      .onSnapshot(snapshot => setCustomers(snapshot.docs.map(doc => doc.id)));
  }, []);

  return (
    <div>
      {customers &&
        customers.map((customer, index) => (
          <UnShippedRow key={index} customer={customer} />
        ))}
    </div>
  );
};

export default UnShipped;
