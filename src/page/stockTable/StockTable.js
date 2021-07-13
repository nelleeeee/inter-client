import { useCallback, useEffect, useState } from "react";
import StockTableRow from "./StockTableRow";
import axios from "axios";

function Stocktable({ location }) {
  const [stocks, setStocks] = useState([]);

  const callOrdersApi = useCallback(async () => {
    await axios
      .get(
        `https://us-central1-interasiastock.cloudfunctions.net/app/sidebar/${location.state.id}`
      )
      .then(order => setStocks(order.data))
      .catch(error => console.log(error));
  }, [location]);

  useEffect(() => {
    //   링크로 넘어온 스테이트 컨트롤
    callOrdersApi();
  }, [callOrdersApi]);
  return (
    <div className="flex-col">
      <div className="grid grid-cols-4 gap-2 grid-flow-col">
        <div>번호</div>
        <div className="col-span-2">앨범명</div>
        <div>수량</div>
      </div>
      <div>
        {stocks?.map(({ id, items_total, default_currency_code }) => (
          <StockTableRow
            key={id}
            id={id}
            items_total={items_total}
            default_currency_code={default_currency_code}
          />
        ))}
      </div>
    </div>
  );
}

export default Stocktable;
