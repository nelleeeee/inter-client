export default function BtobRow({ id, title, relDate, ent, thumbNail }) {
  return (
    <div id={id} className="grid grid-cols-9 gap-2">
      <input
        type="checkbox"
        value="1"
        className="form-tick h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"
        //    appearance-none
      />
      <div>{thumbNail}</div>

      <div className="col-span-3">{title}</div>

      <div>{relDate}</div>
      <div>가격</div>
      <div>수량</div>
    </div>
  );
}
