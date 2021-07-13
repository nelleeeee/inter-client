import { useEffect, useState } from "react";
import Crawl from "./Crawl";
import { db } from "../../firebase";
import CrProductRow from "./CrProductRow";

export default function CrProduct() {
  // 기존 수집해놓은 상품 불러오기
  const [products, setProsucts] = useState([]);

  // 매체별 상품 등록을 위한 컬럼 목록 불러오기
  const [colNamesCh, setColNamesCh] = useState("btob");

  const onChange = async e => {
    const { value } = e.target;

    await setColNamesCh(value);
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
  }, []);

  return (
    <div className="flex-col">
      크롤링 프로덕트
      {console.log(products)}
      <Crawl />
      {/* 랜더링할 채널 선택 디폴트는 비투비 */}
      <select name="selected" defaultValue="btob" onChange={onChange}>
        <option value="btob">BTOB</option>
        <option value="bigC">빅커머스</option>
      </select>
      {/* 디폴트 비투비 컬럼이름 랜더링 */}
      {colNamesCh === "btob" && (
        <div className="grid grid-cols-8 gap-2 grid-flow-col">
          <div>버튼</div>
          <div>썸네일</div>
          <div className="col-span-3">앨범명</div>
          <div>출시일</div>
          <div>가격</div>
        </div>
      )}
      {/* 빅커머스 컬럼이름 랜더링 */}
      {colNamesCh === "bigC" && (
        <div className="grid grid-cols-10 gap-2 grid-flow-col">
          <div>버튼</div>
          <div>섬네일</div>
          <div className="col-span-3">앨범명</div>
          <div>출시일</div>
          <div>그룹명</div>
          <div>소속사</div>
          <div>섬네일URL</div>
          <div>상세URL</div>
        </div>
      )}
      {products?.map(product => (
        <CrProductRow
          key={product.id}
          id={product.id}
          title={product.data.title}
          relDate={product.data.relDate}
          artist={product.data.artist}
          ent={product.data.ent}
          thumbNail={product.data.thumbNail}
          descrip={product.data.descrip}
          colNamesCh={colNamesCh}
        />
      ))}
    </div>
  );
}
