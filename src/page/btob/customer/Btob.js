import { auth, db } from "../../../firebase";
import { useEffect, useState } from "react";
import BtobRow from "./BtobRow";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

export default function Btob({ user }) {
  const history = useHistory();
  //   재고 리스트
  const [product, setProduct] = useState([]);

  // Row 수량 핸들러(둘중 하나는 없어도 되는건가....)
  const [inputs, setInputs] = useState({});

  const { quan } = inputs; // 비구조화 할당을 통해 값 추출(빈 객체도 가능 -> 언디파인 출력)

  const onChange = async e => {
    const { value, name } = e.target; // 우선 e.target 에서 quan 과 value 를 추출

    await setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 주문하기 유저정보/ 주문번호생성
  const [b2bOrderCounts, setB2bOrderCounts] = useState([]);

  // 할인율 위한 유저정보
  const [userData, setUserData] = useState();

  const makeBtobOrder = async () => {
    // 주문번호 생성
    console.log(b2bOrderCounts[0].data + 1);

    // { title:제목, quan:수량 } 형태로 주문 리스트 배열로 만들어서 inputs에서 개체별로 push
    let list = [];

    // 반목문에서 인덱스로 사용
    for (let key in await inputs) {
      list.push({
        title: key,
        quan: Number(inputs[key]),
        price:
          Number(product.filter(x => x.data.title === key)[0].data.price) || 0,
        weight:
          Number(product.filter(x => x.data.title === key)[0].data.weight) || 0,
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
        customer: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        dcRate: userData.dcRate,
        orderState: "makeOrder",
        list,
      });

    // 인풋츠 클리어하고 생성한 주문 번호로 주문확인으로 보내기
    await db
      .collection("orders")
      .doc("b2b")
      .set({ counts: b2bOrderCounts[0].data + 1 });
    setInputs({});
    history.push(`/b2border/${b2bOrderId}`);
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
  }, [user]);

  return (
    <div className="w-full h-screen flex justify-evenly">
      <div className="mt-32 flex flex-col relative ">
        {userData && (
          <button
            onClick={makeBtobOrder}
            className="cursor-pointer bg-blue-400 px-5 
            py-2 rounded-md text-gray-100 font-semibold
            mb-2"
          >
            주문하기
          </button>
        )}

        <button
          className="cursor-pointer bg-blue-400 px-5 
          py-2 rounded-md text-gray-100 font-semibold
          mb-2"
        >
          주문정보
        </button>
        <button
          onClick={() => auth.signOut()}
          className="cursor-pointer bg-blue-400 px-5 
          py-2 rounded-md text-gray-100 font-semibold
          mb-2"
        >
          로그아웃
        </button>
      </div>
      <div className="flex flex-col w-2/3 mt-20">
        <div
          className="grid grid-cols-9 gap-2 grid-flow-col 
        text-center mb-3 bg-blue-600 py-2 rounded-md 
        text-gray-100 text-lg font-semibold"
        >
          {/* <div>check</div> */}
          <div>커버</div>
          <div className="col-span-5">타이틀</div>
          <div>출시일</div>
          <div>가격</div>
          <div>수량</div>
        </div>
        <div>
          {product?.map(product => (
            <BtobRow
              key={product.id}
              id={product.id}
              title={product.data.title}
              relDate={product.data.relDate}
              thumbNail={product.data.thumbNail}
              quan={quan}
              name={product.id}
              onChange={onChange}
              price={product.data.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
