import React, { useState } from "react";
import CommonRow from "./CommonRow";

export const Common = ({ product, onChange }) => {
  const [selectedCat, setSelectedCat] = useState("cd");

  const selectCat = e => {
    const { id } = e.target;
    setSelectedCat(id);
  };

  // 카테고리 추가는 여기서
  const category = ["cd", "dvd", "per", "goods", "limited", "beauty"];

  return (
    <div className="flex flex-col w-4/5 mt-12 overflow-y-auto">
      <div
        className="grid grid-cols-6 grid-flow-col 
        text-center  bg-gray-200  
        text-gray-600 text-md font-semibold"
      >
        {category.map((doc, index) => (
          <div
            key={index}
            onClick={selectCat}
            id={doc}
            className={`${
              selectedCat === doc ? "bg-gray-400 text-gray-100" : ""
            } `}
          >
            {doc.toUpperCase()}
          </div>
        ))}
      </div>
      <div
        className="grid grid-cols-14 grid-flow-col 
        text-center bg-gray-800 py-1 
        text-gray-200 text-sm font-semibold"
      >
        <div>커버</div>
        <div className="col-span-8">타이틀</div>
        <div className="col-span-2">출시일</div>
        <div>가격</div>
        <div className="col-span-2">수량</div>
      </div>
      <div>
        {product &&
          product
            .filter(
              a => a.data.type === "common" && a.data.category === selectedCat
            )
            .map(product => (
              <CommonRow
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
