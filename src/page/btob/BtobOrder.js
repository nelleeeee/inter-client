const BtobOrder = ({ match }) => {
  const { id } = match.params;

  return (
    <div>
      <div>주문 내용 확인</div>
      <div>
        <div className="grid grid-cols-2">
          <div>주문번호</div>
          <div>내용</div>
        </div>
        <div className="grid grid-cols-2">
          <div>주문자</div>
          <div>내용</div>
        </div>
        <div className="grid grid-cols-2">
          <div>주문자 연락처</div>
          <div>내용</div>
        </div>
        <div className="grid grid-cols-2">
          <div>주문자 이메일</div>
          <div>내용</div>
        </div>
        <div className="grid grid-cols-2">
          <div>결제방법</div>
          <div>내용</div>
        </div>
      </div>
      <div>
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
      <div>
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
          <div>No. 내용</div>
          <div>앨범명 내용</div>
          <div>판매가 내용</div>
          <div>할인가 내용</div>
          <div>수량 내용</div>
          <div>금액 내용</div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2">
          <div>공급가액</div>
          <div>내용</div>
        </div>
        <div className="grid grid-cols-2">
          <div>예상운송비</div>
          <div>내용</div>
        </div>
        <div className="grid grid-cols-2">
          <div>합계</div>
          <div>내용</div>
        </div>
        <div className="grid grid-cols-2">
          <div>기본 약관/안내 체크하면 버튼 활성화</div>
          <button>주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default BtobOrder;
