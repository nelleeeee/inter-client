import { useState } from "react";

export default function BtobRow({
  id,
  title,
  relDate,
  // changeHandler,
  // checkedInputs,
  thumbNail,
  name,
  qaun,
  onChange,
  price,
}) {
  return (
    <div id={id} className="grid grid-cols-9 gap-2">
      {/* <input
        type="checkbox"
        onChange={e => {
          changeHandler(e.currentTarget.checked, id);
        }}
        checked={checkedInputs.includes(id) ? true : false}
        // value="1"
        className="form-tick h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
        //    appearance-none
      /> */}
      <img
        className="h-20 bg-contain bg-center bg-no-repeat"
        src={thumbNail}
        alt={title}
      />

      <div className="col-span-3">{title}</div>

      <div>{relDate}</div>
      <div>{price}</div>

      {/* 재고 */}
      {/* 재고보다 많으면 밸리데이션 오류나게 */}
      {/* 아니면 그냥 주문받고 추가로 주문하나? */}
      <input name={name} onChange={onChange} value={qaun} />
    </div>
  );
}
