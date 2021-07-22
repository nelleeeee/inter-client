import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import PreOrderTable from "./preorder/PreOrderTable";
import NoticeTable from "./notice/NoticeTable";
import SimpleList from "./simplelist/SimpleList";
import { Common } from "./common/Common";

export default function Btob({ user }) {
  const history = useHistory();
  //   재고 리스트
  const [product, setProduct] = useState([]);

  // 주문하기 버튼 - 주문 수량이 양수여야 활성화
  const [confirmChecked, setConfirmCheck] = useState(false);

  // 노티스
  const [notices, SetNotices] = useState([]);

  // Row 수량 핸들러
  const [inputs, setInputs] = useState({});

  const onChange = async e => {
    const { value, name } = e.target; // 우선 e.target 에서 quan 과 value 를 추출
    if (value <= 0) {
      setInputs({
        ...inputs,
        [name]: 0,
      });
      setConfirmCheck(false);
      alert("숫자 혹은 1개 이상의 수량을 입력해주세요");
    } else {
      await setInputs({
        ...inputs,
        [name]: Number(value),
      });
      setConfirmCheck(true);
    }
  };

  // 주문하기 유저정보/ 주문번호생성
  const [b2bOrderCounts, setB2bOrderCounts] = useState([]);

  // 할인율 위한 유저정보
  const [userData, setUserData] = useState();

  const makeBtobOrder = async () => {
    // 주문번호 생성

    // { title:제목, quan:수량 } 형태로 주문 리스트 배열로 만들어서 inputs에서 개체별로 push
    let list = [];

    // 반목문에서 인덱스로 사용
    for (let key in await inputs) {
      list.push({
        title: key,
        quan: Number(inputs[key]),
        price:
          Number(product.find(arr => arr.data.title === key).data.price) || 0,
        weight:
          Number(product.find(arr => arr.data.title === key).data.weight) || 0,

        dcRate:
          Number(
            userData.dcRates[
              product.find(arr => arr.data.title === key).data.category
            ]
          ) || 0,
        relDate: product.find(arr => arr.data.title === key).data.relDate || 0,
      });
    }

    // 주문건수 + 1000 으로 주문번호 생성해서 스트링으로 저장
    const b2bOrderId = await String(b2bOrderCounts[0].data + 1000);

    // doc 아이디에 생성한 주문번호 넣고 inputs 에 들어있는 정보로 주문 저장
    await db
      .collection("orders")
      .doc("b2b")
      .collection("b2borders")
      .doc(b2bOrderId)
      .set({
        orderNumber: b2bOrderId,
        customer: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        dcRates: userData.dcRates,
        orderState: "makeOrder",
        list,
      });

    // 인풋츠 클리어하고 생성한 주문 번호로 주문확인으로 보내기
    await db
      .collection("orders")
      .doc("b2b")
      .set({ counts: b2bOrderCounts[0].data + 1 });
    setInputs({});
    history.push(`/b2border/${user.uid}/${b2bOrderId}`);
  };

  // Row들 생성위한 상품데이터 가져와서 뿌려주기
  useEffect(() => {
    db.collection("products").onSnapshot(snapshot => {
      setProduct(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    // 주문번호 생성을 위해 b2b 주문이 몇건인지 확인해서 저장 b2bOrderCounts에
    db.collection("orders").onSnapshot(snapshot =>
      setB2bOrderCounts(snapshot.docs.map(doc => ({ data: doc.data().counts })))
    );

    // 할인 요율 위해 메일로 사용자 정보 가져오기
    db.collection("accounts")
      .doc(user?.email)
      .get()
      .then(doc => setUserData(doc.data()));

    // 노티스 가져오기
    db.collection("notice")
      .orderBy("index", "desc")
      .onSnapshot(snapshot => {
        SetNotices(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, [user]);

  return (
    // d1
    <div className="w-full h-screen flex ">
      {/* d2 -1 */}
      <div className=" w-3/4 flex flex-col items-center mt-12">
        {/* d3-1 */}
        <div className="flex flex-row w-5/6 h-1/4 justify-evenly">
          {/* d4 */}
          {product && <PreOrderTable product={product} onChange={onChange} />}
          {notices && <NoticeTable notices={notices} />}
        </div>
        {/* d3-2 */}
        <Common product={product} onChange={onChange} />
      </div>
      {/* d2-2 */}
      <SimpleList
        confirmChecked={confirmChecked}
        makeBtobOrder={makeBtobOrder}
        userData={userData}
        inputs={inputs}
        product={product}
      />
    </div>
  );
}
