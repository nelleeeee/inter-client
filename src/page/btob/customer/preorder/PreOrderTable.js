import React from "react";
import PreOrderRow from "./PreOrderRow";

const PreOrderTable = ({ product, onChange }) => {
  // 프로덕트에서 상품 디비에 선주문 체크해놓으면
  // 그것만 골라서 배열 새로 만들기
  return (
    <div className=" w-7/12 overflow-y-auto">
      {/* 표 */}

      {/* 표 제목 */}
      <div className="text-center text-sm font-bold text-gray-800">
        PRE ORDER SCHEDULE
      </div>
      {/* 표 헤더 */}
      <div
        className="grid grid-cols-12 grid-flow-col 
        text-center bg-gray-800 p-1 
        text-gray-200 text-xs"
      >
        <div>커버</div>
        <div className="col-span-6">타이틀</div>
        <div className="col-span-2">주문마감일</div>
        <div>가격</div>
        <div className="col-span-2">수량</div>
      </div>
      {/* 표 로우 */}
      <div className=" ">
        {product &&
          product
            .filter(a => a.data.type === "preOrder")
            .map(product => (
              <PreOrderRow
                key={product.id}
                id={product.id}
                title={product.data.title}
                relDate={product.data.relDate}
                thumbNail={product.data.thumbNail}
                name={product.id}
                onChange={onChange}
                price={product.data.price}
              />
            ))}
      </div>
    </div>
  );
};

export default PreOrderTable;
