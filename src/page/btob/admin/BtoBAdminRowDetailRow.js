import React from "react";

const BtoBAdminRowDetailRow = ({
  title,
  price,
  quan,
  weight,
  dcRate,
  relDate,
  index,
  createdAt,
}) => {
  const today = new Date();
  const preOrder =
    relDate.toDate().toLocaleDateString() < today.toLocaleDateString();
  return (
    <div
      className={` place-items-center grid grid-cols-20 grid-flow-col text-center border-b border-l border-r py-1 ${
        !preOrder ? "bg-red-200" : ""
      }`}
    >
      <input type="checkbox" className="" />
      <div>{index + 1}</div>
      <div className="col-span-2">{createdAt}</div>

      <div className="col-span-2">{relDate.toDate().toLocaleDateString()} </div>
      <div className="col-span-9">{title}</div>
      <div>{price} </div>
      <div className="col-span-2">
        {price - price * dcRate} {`[${dcRate * 100}%]`}
      </div>
      <div>{quan} 개</div>
      <div>{price * quan} 원</div>
    </div>
  );
};

export default BtoBAdminRowDetailRow;
