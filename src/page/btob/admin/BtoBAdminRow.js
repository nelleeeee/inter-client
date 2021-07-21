import React from "react";
import { Link } from "react-router-dom";

const BtoBAdminRow = ({
  id,
  createdAt,
  customer,
  dcRate,
  listLength,
  orderState,
  totalPrice,
  totalQuan,
  totalWeight,
  orders,
}) => {
  if (orders) {
    return (
      <Link
        to={{
          pathname: `/b2b/admin/${id}`,
          state: { orders },
        }}
      >
        <div className="grid grid-cols-11 grid-flow-col text-center border-b border-l border-r py-1">
          <div>{id}</div>
          <div className="col-span-2">
            {new Date(createdAt.toDate()).toLocaleString()}
          </div>
          <div className="col-span-2">{customer}</div>
          <div>{dcRate} %</div>
          <div>{listLength} 종류</div>
          <div>{orderState} </div>
          <div>{totalPrice} 원</div>
          <div>{totalQuan} 개</div>
          <div>{totalWeight} KG</div>
        </div>
      </Link>
    );
  }

  return "a";
};

export default BtoBAdminRow;
