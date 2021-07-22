import React from "react";
import { Link } from "react-router-dom";

const BtoBAdminRow = ({
  id,
  createdAt,
  customer,
  listLength,
  orderState,
  totalPrice,
  totalQuan,
  totalWeight,
  orders,
}) => {
  const today = new Date();
  const included = orders
    .find(arr => arr.id === id)
    .data.list.reduce((i, c) => {
      return (
        !i ||
        !c.relDate.toDate().toLocaleDateString() < today.toLocaleDateString
      );
    }, true);

  if (orders) {
    return (
      <Link
        to={{
          pathname: `/b2b/admin/${id}`,
          state: { orders },
        }}
      >
        <div
          className={`grid grid-cols-10 grid-flow-col text-center border-b border-l border-r py-1 ${
            !included ? " bg-red-200" : ""
          }`}
        >
          <div>{id}</div>
          <div className="col-span-2">
            {new Date(createdAt.toDate()).toLocaleString()}
          </div>
          <div className="col-span-2">{customer}</div>
          <div>{listLength} 종류</div>
          <div>{orderState} </div>
          <div>{totalPrice} 원</div>
          <div>{totalQuan} 개</div>
          <div>{totalWeight} KG</div>
        </div>
      </Link>
    );
  }

  return "loading";
};

export default BtoBAdminRow;
