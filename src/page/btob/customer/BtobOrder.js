import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import firebase from "firebase";
const BtobOrder = ({ match, user }) => {
  const { id } = match.params;
  const history = useHistory();

  const [order, setOrder] = useState();

  // 약관 체크
  const [confirmChecked, setConfirmCheck] = useState(false);

  const checkHandler = e => {
    const { checked } = e.target;
    console.log(checked);
    if (checked) {
      setConfirmCheck(true);
    } else {
      setConfirmCheck(false);
    }
  };

  // 주문자가 작성하는부분
  const [inputs, setInputs] = useState({
    paymentMethod: "transfer",
    recipient: "",
    shippingType: "dhl",
    address: "",
    zipcode: "",
    recipientPhoneNumber: "",
    recipientEmail: "",
    shippingMessage: "",
  });

  const {
    paymentMethod,
    recipient,
    shippingType,
    address,
    zipcode,
    recipientPhoneNumber,
    recipientEmail,
    shippingMessage,
  } = inputs; // 비구조화 할당을 통해 값 추출(빈 객체도 가능 -> 언디파인 출력)

  const onChange = async e => {
    const { value, name } = e.target; // 우선 e.target 에서 quan 과 value 를 추출

    await setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const confirmOrder = () => {
    db.collection("orders")
      .doc("b2b")
      .collection("b2borders")
      .doc(id)
      .update({
        orderState: "confirmOrder",
        totalQuan:
          order &&
          order.list.reduce((i, c) => {
            return i + c.quan;
          }, 0),
        totalWeight:
          order &&
          order.list.reduce((i, c) => {
            return i + c.weight * c.quan;
          }, 0),
        totalPrice:
          order &&
          order.list.reduce((i, c) => {
            return i + (c.price - order.dcRate * (1 / 100) * c.price) * c.quan;
          }, 0),
        paymentMethod,
        recipient,
        shippingType,
        address,
        zipcode,
        recipientPhoneNumber,
        recipientEmail,
        shippingMessage,
      });

    alert("주문 완료");
    history.push("/b2b");
  };

  useEffect(() => {
    db.collection("orders")
      .doc("b2b")
      .collection("b2borders")
      .doc(id)
      .get()
      .then(doc => setOrder(doc.data()));
  }, [id]);

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-3/5 flex-col mt-20 flex items-center">
        <div
          className="text-center text-2xl bg-blue-400 py-3 
        rounded-lg font-bold text-gray-100 mb-5 w-full"
        >
          주문 내용 확인
        </div>
        {/*  */}
        <div className="flex-col mb-10 w-2/3 flex space-y-2">
          <div className="grid grid-cols-2">
            <div>주문번호</div>
            {id && <div>{id}</div>}
          </div>
          {user && (
            <>
              <div className="grid grid-cols-2">
                <div>주문자</div>
                <div>{user.displayName}</div>
              </div>
              <div className="grid grid-cols-2">
                <div>주문자 연락처</div>
                <div>{user.phoneNumber}</div>
              </div>
              <div className="grid grid-cols-2">
                <div>주문자 이메일</div>
                <div>{user.email}</div>
              </div>
            </>
          )}

          <div className="grid grid-cols-2">
            <div>결제방법</div>
            <select
              name="paymentMethod"
              value={paymentMethod}
              onChange={onChange}
            >
              <option value="transfer">계좌이체</option>
            </select>
          </div>
        </div>
        {/*  */}
        <div className="flex-col mb-10 flex w-2/3 space-y-2">
          <div className="grid grid-cols-2">
            <div>수령인</div>
            <input
              className="border h-8"
              type="text"
              name="recipient"
              value={recipient}
              onChange={onChange}
            />
          </div>
          <div className="grid grid-cols-2">
            <div>배송방법</div>
            <select
              name="shippingType"
              value={shippingType}
              onChange={onChange}
            >
              <option value="dhl">DHL</option>
              <option value="ems">EMS</option>
            </select>
          </div>
          <div className="grid grid-cols-2">
            <div>받는주소</div>
            <input
              className="border h-8"
              type="text"
              name="address"
              value={address}
              onChange={onChange}
            />
          </div>
          <div className="grid grid-cols-2">
            <div>우편번호</div>
            <input
              className="border h-8"
              type="text"
              name="zipcode"
              value={zipcode}
              onChange={onChange}
            />
          </div>
          <div className="grid grid-cols-2">
            <div>수령인 연락처</div>
            <input
              className="border h-8"
              type="text"
              name="recipientPhoneNumber"
              value={recipientPhoneNumber}
              onChange={onChange}
            />
          </div>
          <div className="grid grid-cols-2">
            <div>수령인 이메일</div>
            <input
              className="border h-8"
              type="text"
              name="recipientEmail"
              value={recipientEmail}
              onChange={onChange}
            />
          </div>
          <div className="grid grid-cols-2">
            <div>요청사항</div>
            <input
              className="border h-8"
              type="text"
              name="shippingMessage"
              value={shippingMessage}
              onChange={onChange}
            />
          </div>
        </div>
        {/*  */}
        <div className="flex-col mb-10 w-full">
          {/* 번호/앨범명/판매가/할인가/금액 */}
          <div className="grid grid-cols-10 text-center bg-blue-300 rounded text-gray-100">
            <div>No.</div>
            <div className="col-span-5">앨범명</div>
            <div>판매가</div>
            <div>할인가</div>
            <div>수량</div>
            <div>금액</div>
          </div>
          {order && (
            <>
              {order.list.map((doc, index) => (
                <div
                  className="grid grid-cols-10 text-center text-sm border-b-2 py-3"
                  key={index}
                >
                  <div>{index + 1}</div>
                  <div className="col-span-5">{doc.title}</div>
                  <div>{doc.price} 원</div>
                  <div>
                    {doc.price - order.dcRate * (1 / 100) * doc.price} 원
                    {` [${order.dcRate} %]`}
                  </div>
                  <div>{doc.quan} 개</div>
                  <div>
                    {(doc.price - order.dcRate * (1 / 100) * doc.price) *
                      doc.quan}{" "}
                    원
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
        {/*  */}
        <div className="flex-col mb-10 w-full flex items-end">
          <div className="grid grid-cols-2 w-1/2 text-right">
            <div>공급가액</div>
            <div>
              {order &&
                order.list.reduce((i, c) => {
                  return (
                    i + (c.price - order.dcRate * (1 / 100) * c.price) * c.quan
                  );
                }, 0)}{" "}
              원
            </div>
          </div>
          <div className="grid grid-cols-2 w-1/2 text-right">
            <div>예상운송비</div>
            <div>내용</div>
          </div>
          <div className="grid grid-cols-2 w-1/2 text-right">
            <div>합계</div>
            <div>공급가액 + 예상운송비</div>
          </div>
        </div>
        {/*  */}
        <div className="grid grid-cols-6 items-center mb-96 w-full place-items-center">
          <div className="col-span-3">기본 약관/안내 체크하면 버튼 활성화</div>
          <input
            className="col-span-1"
            type="checkbox"
            checked={confirmChecked ? true : false}
            onChange={checkHandler}
          />
          <button
            className={`${
              confirmChecked
                ? "col-span-2 bg-blue-500 py-2 px-8 rounded-lg text-gray-100"
                : "col-span-2 bg-blue-100 py-2 px-8 rounded-lg text-gray-100"
            }`}
            disabled={!confirmChecked}
            onClick={confirmOrder}
          >
            주문하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BtobOrder;
