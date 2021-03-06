import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import BtoBAdminRowDetailRow from "./BtoBAdminRowDetailRow";

const BtoBAdminRowDetail = ({ match, location }) => {
  const { id } = match.params;

  // 링크타고 올때 받은 prop으로 inputs 초기값 할당
  const order = location.state.orders;

  // TO DO : 문서 전체 불러오지말고 전달받은 id 로 시간 하나만 불러오기
  // order를 prop 으러 전달받으면 시간객체가 그냥 객체로 바뀌는듯?
  // 시간객체 매쏘드를 못씀

  // 내용위한 주문들 불러오기
  const [orders, setOrders] = useState();

  // 수령인 부분 inputs
  const [inputs, setInputs] = useState({
    recipientEmail: order.find(order => order.id === id).data.recipientEmail,
    recipientPhoneNumber: order.find(order => order.id === id).data
      .recipientPhoneNumber,
    address: order.find(order => order.id === id).data.address,
    zipcode: order.find(order => order.id === id).data.zipcode,
    recipient: order.find(order => order.id === id).data.recipient,
    orderState: order.find(order => order.id === id).data.orderState,
    paymentMethod: order.find(order => order.id === id).data.paymentMethod,
    shippingType: order.find(order => order.id === id).data.shippingType,
    shippingMessage: order.find(order => order.id === id).data.shippingMessage,
  });

  const {
    recipientEmail,
    recipientPhoneNumber,
    address,
    zipcode,
    recipient,
    orderState,
    paymentMethod,
    shippingType,
    shippingMessage,
  } = inputs;

  const onChange = e => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 수정사항 저장
  const saveDetails = () => {
    db.collection("orders").doc("b2b").collection("b2borders").doc(id).update({
      recipientEmail,
      recipientPhoneNumber,
      address,
      zipcode,
      recipient,
      orderState,
      paymentMethod,
    });
  };

  useEffect(() => {
    db.collection("orders")
      .doc("b2b")
      .collection("b2borders")
      .onSnapshot(snapshot =>
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
      );
  }, []);
  return (
    <div className="w-full h-full flex justify-center">
      {orders && order && (
        <div className="w-11/12 flex-col mt-20">
          <div
            className="text-center text-xl bg-gray-800 py-1 
        rounded-sm font-bold text-gray-100 mb-5 w-full"
          >
            주문 내용 확인
          </div>

          <div className="flex flex-row justify-evenly">
            {/* 주문내용 확인 */}
            <div className="flex-col mb-10 flex space-y-2">
              <div className="grid grid-cols-2">
                <div>주문번호</div>
                <div>{id}</div>
              </div>
              <div className="grid grid-cols-2">
                <div>주문상태</div>
                <select
                  name="orderState"
                  value={orderState}
                  onChange={onChange}
                >
                  <option value="makeOrder">주문서작성중</option>
                  <option value="confirmOrder">주문완료</option>
                  <option value="packaging">포장중</option>
                  <option value="shipping">배송중</option>
                </select>
              </div>
              <div className="grid grid-cols-2">
                <div>이메일</div>
                <div>{orders.find(order => order.id === id).data.customer}</div>
              </div>
              <div className="grid grid-cols-2">
                <div>주문일</div>
                {new Date(
                  orders.find(order => order.id === id).data.createdAt.toDate()
                ).toLocaleString()}
              </div>
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
              <div className="grid grid-cols-2">
                <div>발송방법</div>
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
                <div>전화번호</div>
                {
                  orders.find(order => order.id === id).data
                    .recipientPhoneNumber
                }
              </div>
              <div className="grid grid-cols-1">
                <div className="text-center my-1 font-semibold">할인율</div>
                <div className="grid grid-cols-6 bg-gray-600 text-center text-gray-100 rounded-sm px-1">
                  {Object.keys(
                    orders.find(order => order.id === id).data.dcRates
                  ).map((doc, index) => (
                    <div key={index}>{doc}</div>
                  ))}
                </div>
                <div className="grid grid-cols-6 text-center border-b px-1 border-l border-r text-sm">
                  {Object.values(
                    orders.find(order => order.id === id).data.dcRates
                  ).map((doc, index) => (
                    <div key={index}>{doc * 100} %</div>
                  ))}
                </div>
              </div>
            </div>
            {/* 수령인 파트 */}

            <div className="flex-col mb-10 flex space-y-2">
              <div className="text-center">수령인</div>
              <div className="grid grid-cols-2">
                <div>email</div>
                <input
                  name="recipientEmail"
                  value={recipientEmail}
                  onChange={onChange}
                />{" "}
              </div>
              <div className="grid grid-cols-2">
                <div>전화번호</div>
                <input
                  name="recipientPhoneNumber"
                  value={recipientPhoneNumber}
                  onChange={onChange}
                />{" "}
              </div>
              <div className="grid grid-cols-2">
                <div>주소</div>
                <input
                  name="address"
                  value={address}
                  onChange={onChange}
                />{" "}
              </div>
              <div className="grid grid-cols-2">
                <div>우편번호</div>
                <input
                  name="zipcode"
                  value={zipcode}
                  onChange={onChange}
                />{" "}
              </div>
              <div className="grid grid-cols-2">
                <div>이름</div>
                <input
                  name="recipient"
                  value={recipient}
                  onChange={onChange}
                />{" "}
              </div>
              <div className="grid grid-cols-2">
                <div>요청사항</div>
                <input
                  name="shippingMessage"
                  value={shippingMessage}
                  onChange={onChange}
                />{" "}
              </div>
              <button onClick={saveDetails}>저장하기</button>
            </div>
          </div>

          <div className="w-full text-center">상품종류</div>
          <div className="grid grid-cols-28 text-center bg-gray-800 rounded-sm text-gray-100">
            <div></div>
            <div>No.</div>
            <div className="col-span-2">주문일</div>
            <div className="col-span-2">발매일</div>
            <div className="col-span-15">앨범명</div>
            <div>판매가</div>
            <div className="col-span-2">할인가</div>
            <div>무게</div>
            <div>수량</div>
            <div>총무게</div>

            <div>총액</div>
          </div>
          <div>
            {orders &&
              order &&
              orders
                .find(order => order.id === id)
                .data.list.map((doc, index) => (
                  <BtoBAdminRowDetailRow
                    key={index}
                    index={index}
                    createdAt={new Date(
                      orders
                        .find(order => order.id === id)
                        .data.createdAt.toDate()
                    ).toLocaleDateString()}
                    title={doc.title}
                    relDate={doc.relDate}
                    price={doc.price}
                    quan={doc.quan}
                    weight={doc.weight}
                    totalWeight={doc.weight * doc.quan}
                    dcRate={doc.dcRate}
                  />
                ))}
          </div>
          <div className="text-right flex flex-col items-end mt-6 text-lg">
            <div className="grid grid-cols-2 w-96 mb-3">
              <div>총무게</div>
              <div>123124 kg</div>
            </div>
            <div className="grid grid-cols-2 w-96  mb-3">
              <div>예상운송비</div>
              <div>123123 원</div>
            </div>
            <div className="grid grid-cols-2 w-96 ">
              <div>총액</div>
              <div>1233463456 원</div>
            </div>
          </div>

          {/* <div className="w-full text-center">SHIPPING 1</div>
          <div className="w-full text-center">SHIPPING 2</div>
          <div className="w-full text-center">SHIPPING 3</div> */}
        </div>
      )}
    </div>
  );
};

export default BtoBAdminRowDetail;
