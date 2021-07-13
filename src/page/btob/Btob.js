import { db } from "../../firebase";
import { useEffect, useState } from "react";
import BtobRow from "./BtobRow";
export default function Btob() {
  //   재고 리스트
  const [product, setProduct] = useState([]);

  useEffect(() => {
    db.collection("products").onSnapshot(snapshot => {
      setProduct(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <>
      <div className="flex-col">
        <div>B2B</div>
        <div className="grid grid-cols-9 gap-2 grid-flow-col">
          <div>check</div>
          <div>썸넬</div>
          <div className="col-span-3">앨범명</div>
          <div>출시일</div>
          <div>가격</div>
          <div>수량</div>
        </div>
        <div>
          {product?.map(product => (
            <BtobRow
              key={product.id}
              id={product.id}
              title={product.data.title}
              relDate={product.data.relDate}
              thumbNail={product.data.thumbNail}
            />
          ))}
        </div>
      </div>
    </>
  );
}
