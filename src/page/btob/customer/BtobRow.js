export default function BtobRow({
  id,
  title,
  relDate,
  thumbNail,
  name,
  qaun,
  onChange,
  price,
}) {
  return (
    <div
      id={id}
      className="grid grid-cols-9 gap-2  place-items-center text-center mb-2 text-md"
    >
      <img
        className="h-20 bg-contain bg-center bg-no-repeat rounded"
        src={thumbNail}
        alt={title}
      />

      <div className="col-span-5">{title}</div>

      <div className="pt-6">{relDate}</div>
      <div>{price} 원</div>

      {/* 재고 */}
      {/* 재고보다 많으면 밸리데이션 오류나게 */}
      {/* 아니면 그냥 주문받고 추가로 주문하나? */}
      <input
        type="number"
        name={name}
        onChange={onChange}
        value={qaun}
        className="w-1/2 h-10 border text-center"
      />
    </div>
  );
}
