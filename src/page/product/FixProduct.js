import FixSyn from "./FixSyn";
import FixBigC from "./FixBigC";
export default function FixProduct({ match }) {
  // CrproductRow 에서 id로 링크 타고들어와서 prop 전달받기 for 데이터 불러오기
  const { id } = match.params;
  // CrProductRow 에서 id 랑 매체 이름 받기
  // 매체 이름이랑 매체별 필요한 칼럼 파이어스토에서 받아서 넘겨서
  // FixSyn으로가서 파이어스토어에서 가져온 객체에서 필요한 칼럼만 뽑아서 배열 만들고
  // 그 배열로 map
  return (
    // 신나라 수집한 데이터칸
    <div className="flex-col">
      <FixSyn id={id} />
      {/* 비투비 등록/수정 */}
      <FixBigC id={id} />
      {/* 빅커머스 등록 수정 */}
    </div>
  );
}
