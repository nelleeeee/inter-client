import { useEffect, useState } from "react";
import Crawl from "./Crawl";
import { db } from "../../firebase";
import CrProductRow from "./CrProductRow";

export default function CrProduct() {
  // 기존 수집해놓은 상품 불러오기
  const [products, setProsucts] = useState([]);

  // 매체별 상품 등록을 위한 컬럼 목록 불러오기
  const [colNamesCh, setColNamesCh] = useState("syn");

  const [requiredColsOb, setRequiredColsOb] = useState({});

  const onChange = e => {
    const { value } = e.target;

    setColNamesCh(value);
  };

  useEffect(() => {
    db.collection("products").onSnapshot(snapshot => {
      setProsucts(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    db.collection("requiredCol")
      .doc(colNamesCh)
      .get()
      .then(doc => setRequiredColsOb(doc.data()));
  }, [colNamesCh]);

  return (
    <div className="flex-col w-9/12">
      크롤링 프로덕트
      <Crawl />
      <select name="selected" defaultValue="syn" onChange={onChange}>
        <option value="syn">신나라레코드</option>
        <option value="btob">BTOB</option>
        <option value="bigC">빅커머스</option>
      </select>
      <div
        className={`grid grid-cols-${
          Object.keys(requiredColsOb).length + 1
        } gap-2 grid-flow-col`}
      >
        <div>버튼</div>
        {Object.values(requiredColsOb).map(col => (
          <div key={col + "maincol"}>{col}</div>
        ))}
      </div>
      {products?.map(product => (
        <CrProductRow
          key={product.id + "main"}
          id={product.id}
          requiredColsOb={requiredColsOb}
          product={product}
        />
      ))}
    </div>
  );
}
