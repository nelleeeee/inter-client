function StockTableRow({ id, items_total, default_currency_code }) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div>{id}</div>
      <div className="col-span-2">{items_total}</div>
      <div>{default_currency_code}</div>
    </div>
  );
}

export default StockTableRow;
