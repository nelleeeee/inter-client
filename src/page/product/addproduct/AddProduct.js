import AddRow from "./AddRow";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { useHistory } from "react-router-dom";

export default function AddProduct() {
  const history = useHistory();

  // const [requiredCols, setRequiredCols] = useState([]);

  const [inputs, setInputs] = useState({
    title: "",
    artist: "",
    ent: "",
    relDate: "",
    thumbNail: "",
    descrip: "",
    weight: "",
    x: "",
    y: "",
    z: "",
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
  } = inputs;

  const addProduct = () => {
    // db.collection("products").doc("test").set(addData);
    // history.push("/crproduct");
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
      });
  };
  const onChange = e => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  // useEffect(() => {
  //   db.collection("requiredCol").onSnapshot(snapshot => {
  //     setRequiredCols(
  //       snapshot.docs.map(doc => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     );
  //   });
  //   console.log(requiredCols);
  // }, []);

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
              <div className="flex">
                <div>앨범명</div>
                <input
                  type="text"
                  onChange={onChange}
                  name="title"
                  value={title}
                />
              </div>
              <div className="flex">
                <div>가격</div>
                <input
                  type="number"
                  onChange={onChange}
                  name="price"
                  value={price}
                />
              </div>
              <div className="flex">
                <div>그룹명</div>
                <input
                  type="text"
                  onChange={onChange}
                  name="artist"
                  value={artist}
                />
              </div>
              <div className="flex">
                <div>소속사</div>
                <input type="text" onChange={onChange} name="ent" value={ent} />
              </div>
              <div className="flex">
                <div>출시일</div>
                <input
                  type="date"
                  onChange={onChange}
                  name="relDate"
                  value={relDate}
                />
              </div>
              <div className="flex">
                <div>썸네일</div>
                <input
                  type="text"
                  onChange={onChange}
                  name="thumbNail"
                  value={thumbNail}
                />
              </div>
              <div className="flex">
                <div>상세페이지</div>
                <input
                  type="text"
                  onChange={onChange}
                  name="descrip"
                  value={descrip}
                />
              </div>
              <div className="flex">
                <div>무게</div>
                <input
                  type="number"
                  onChange={onChange}
                  name="weight"
                  value={weight}
                />
              </div>
              <div className="flex">
                <div>가로</div>
                <input type="number" onChange={onChange} name="x" value={x} />
              </div>
              <div className="flex">
                <div>세로</div>
                <input type="number" onChange={onChange} name="y" value={y} />
              </div>
              <div className="flex">
                <div>높이</div>
                <input type="number" onChange={onChange} name="z" value={z} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {requiredCols.map((col, index) => (
        <AddRow
          key={index}
          chName={col.id}
          cols={col.data}
          setAddData={setAddData}
          onChange={onChange}
        />
      ))} */}
    </div>
  );
}
