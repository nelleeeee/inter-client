import React from "react";

const BtoBAdminRowDetail = ({ match, location }) => {
  const { id } = match.params;
  const { orders } = location.state;
  return (
    <div className="w-full h-full flex justify-center">
      {orders &&
        (console.log(orders.find(order => order.id === id).data),
        (
          <div className="w-11/12 flex-col mt-20">
            <div className="flex flex-row justify-evenly">
              <div>
                <div>주문인</div>
                <div>
                  <div>
                    <div>주문번호</div>
                    <input />{" "}
                  </div>
                  <div>
                    <div>이메일</div>
                    <input />{" "}
                  </div>
                  <div>
                    <div>주문일</div>
                    <input type="date" />{" "}
                  </div>
                  <div>
                    <div>지불방식</div>
                    <input />{" "}
                  </div>
                  <div>
                    <div>발송방법</div>
                    <input />{" "}
                  </div>
                  <div>
                    <div>전화번호</div>
                    <input />{" "}
                  </div>
                  <div>
                    <div>할인율</div>
                    <input />{" "}
                  </div>
                </div>
              </div>
              <div>수령인</div>
            </div>

            <div className="w-full text-center">
              상품종류 및 인보이스 전/후 작성
            </div>
          </div>
        ))}
    </div>
  );
};

export default BtoBAdminRowDetail;
