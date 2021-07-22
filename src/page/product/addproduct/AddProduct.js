import { useState } from "react";
import { db } from "../../../firebase";
import { useHistory } from "react-router-dom";

export default function AddProduct() {
  const history = useHistory();

  // 인풋값
  const [inputs, setInputs] = useState({
    title: "",
    price: "",
    artist: "",
    ent: "",
    relDate: "",
    thumbNail: "",
    descrip: "",
    weight: "",
    x: "",
    y: "",
    z: "",
    type: "common",
    category: "cd",
  });

  const {
    title,
    price,
    artist,
    ent,
    relDate,
    thumbNail,
    descrip,
    weight,
    x,
    y,
    z,
    type,
    category,
  } = inputs;

  // 인풋 칸들
  const inputsNames = [
    { title: "제목" },
    { price: "가격" },
    { artist: "그룹명" },
    { ent: "소속사" },
    { relDate: "출시일" },
    { thumbNail: "썸네일" },
    { descrip: "상세페이지" },
    { weight: "무게" },
    { x: "가로" },
    { y: "세로" },
    { z: "높이" },
    { type: "타입" },
    { category: "카테고리" },
  ];

  const addProduct = () => {
    db.collection("products")
      .doc(title)
      .set({
        title,
        price: Number(price),
        artist,
        ent,
        relDate: new Date(relDate),
        thumbNail,
        descrip,
        weight: Number(weight),
        x: Number(x),
        y: Number(y),
        z: Number(z),
        type,
        category,
        channel: "add",
        imgUrl: "",
      });

    alert("저장되었습니다");
  };
  const onChange = e => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
  };

  return (
    <div className="flex-col w-9/12">
      <div>
        <div>상품저장</div>

        <button onClick={addProduct}>저장하기</button>

        <div>
          <div>
            <div>
              <div>b2b</div>
              {/* b2bAdded */}
              <div>등록하기</div>
            </div>
            <div>
              {Object.keys(inputs).map((doc, index) =>
                doc !== "relDate" && doc !== "type" && doc !== "category" ? (
                  <div key={index} className="flex">
                    <div>{inputsNames[index][doc]}</div>
                    <input
                      type="text"
                      onChange={onChange}
                      name={`${doc}`}
                      value={inputs.doc}
                    />
                  </div>
                ) : doc === "relDate" ? (
                  <div key={index} className="flex">
                    <div>{inputsNames[index][doc]}</div>
                    <input
                      type="date"
                      onChange={onChange}
                      name={`${doc}`}
                      value={inputs.doc}
                    />
                  </div>
                ) : doc === "type" ? (
                  <div key={index} className="flex">
                    <div>{inputsNames[index][doc]}</div>
                    <select name={`${doc}`} value={type} onChange={onChange}>
                      <option value="common">일반상품</option>
                      <option value="preOrder">선주문상품</option>
                    </select>
                  </div>
                ) : (
                  <div key={index} className="flex">
                    <div>{inputsNames[index][doc]}</div>
                    <select
                      name={`${doc}`}
                      value={category}
                      onChange={onChange}
                    >
                      <option value="cd">CD</option>
                      <option value="dvd">DVD</option>
                      <option value="per">PER</option>
                      <option value="goods">GOOD</option>
                      <option value="limited">LIMITED</option>
                      <option value="beauty">BEAUTY</option>
                    </select>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
