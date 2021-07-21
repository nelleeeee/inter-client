import React from "react";

const BtoBAdminRowDetailRow = ({
  title,
  price,
  quan,
  weight,
  dcRate,
  index,
}) => {
  return (
    <div className="grid grid-cols-11 grid-flow-col text-center border-b border-l border-r py-1">
      <div>{index}</div>

      <div className=" col-span-7">{title} %</div>
      <div>{price} </div>
      <div>{quan} 원</div>
      <div>{weight} 개</div>
    </div>
  );
};

export default BtoBAdminRowDetailRow;
