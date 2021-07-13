import { useState } from "react";
import axios from "axios";

export default function Crawl() {
  const [inputs, setInputs] = useState({
    channel: "synnara",
    productId: "",
  });

  const { channel, productId } = inputs;

  const onChange = e => {
    const { value, name } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onReset = e => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:5001/interasiastock/us-central1/app/cr/${channel}/${productId}`
      )
      .catch(e => console.log(e));
  };

  return (
    <div>
      <form action="">
        <select defaultValue="synnara" name="channel" onChange={onChange}>
          <option value="synnara">신나라레코드</option>
          <option value="linefriends">라인프렌즈</option>
        </select>
        <input
          name="productId"
          value={productId}
          onChange={onChange}
          type="text"
          placeholder="상품번호를 입력하세요"
        />
        <button onClick={onReset}>가져오기</button>
      </form>
      {channel}
      {productId}
    </div>
  );
}
