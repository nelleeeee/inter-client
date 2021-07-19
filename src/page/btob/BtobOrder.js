import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const BtobOrder = ({ match, user }) => {
  const { id } = match.params;
  const history = useHistory();

  const [order, setOrder] = useState();

  const confirmOrder = () => {
    db.collection("orders")
      .doc("b2b")
      .collection("b2borders")
      .doc(id)
      .update({
        orderConfirm: true,
        totalPrice:
          order &&
          order.list.reduce((i, c) => {
            return i + (c.price - order.dcRate * (1 / 100) * c.price) * c.quan;
          }, 0),
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
    <div className="w-9/12 flex-col">
      <div>주문 내용 확인</div>
      <div className="flex-col mb-10">
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
          <select name="" id="">
            <option value="">계좌이체</option>
          </select>
        </div>
      </div>
      <div className="flex-col mb-10">
        <div className="grid grid-cols-2">
          <div>수령인</div>
          <input type="text" />
        </div>
        <div className="grid grid-cols-2">
          <div>배송방법</div>
          <input type="text" />
        </div>
        <div className="grid grid-cols-2">
          <div>받는주소</div>
          <input type="text" />
        </div>
        <div className="grid grid-cols-2">
          <div>우편번호</div>
          <input type="text" />
        </div>
        <div className="grid grid-cols-2">
          <div>수령인 연락처</div>
          <input type="text" />
        </div>
        <div className="grid grid-cols-2">
          <div>수령인 이메일</div>
          <input type="text" />
        </div>
        <div className="grid grid-cols-2">
          <div>배송메시지</div>
          <input type="text" />
        </div>
      </div>
      <div className="flex-col mb-10">
        <div>상품정보</div>
        {/* 번호/앨범명/판매가/할인가/금액 */}
        <div className="grid grid-cols-6">
          <div>No.</div>
          <div>앨범명</div>
          <div>판매가</div>
          <div>할인가</div>
          <div>수량</div>
          <div>금액</div>
        </div>
        <div className="grid grid-cols-6">
          {order && (
            <>
              {console.log(order)}
              {order.list.map((doc, index) => (
                <>
                  <div>{index + 1}</div>
                  <div>{doc.title}</div>
                  <div>{doc.price}</div>
                  <div>
                    {doc.price - order.dcRate * (1 / 100) * doc.price}
                    {`[할인율 ${order.dcRate} %]`}
                  </div>
                  <div>{doc.quan}</div>
                  <div>
                    {(doc.price - order.dcRate * (1 / 100) * doc.price) *
                      doc.quan}{" "}
                  </div>
                </>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="flex-col mb-10">
        <div className="grid grid-cols-2">
          <div>공급가액</div>
          <div>
            {order &&
              order.list.reduce((i, c) => {
                return (
                  i + (c.price - order.dcRate * (1 / 100) * c.price) * c.quan
                );
              }, 0)}
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div>예상운송비</div>
          <div>내용</div>
        </div>
        <div className="grid grid-cols-2">
          <div>합계</div>
          <div>공급가액 + 예상운송비</div>
        </div>
      </div>

      <div className="flex-col mb-10">
        <div className="grid grid-cols-2">
          <div>기본 약관/안내 체크하면 버튼 활성화</div>
          <button onClick={confirmOrder}>주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default BtobOrder;
