import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import StatusMenus from "./StatusMenus";

import { auth } from "../../firebase";

export default function Sidebar() {
  const history = useHistory();

  // 빅커머스
  // 총 오더갯수
  const [status, setStatus] = useState([]);
  async function callApi() {
    await axios
      .get(
        "https://us-central1-interasiastock.cloudfunctions.net/app/sidebar/sidebarMenu"
      )
      .then(res => setStatus(res))
      .catch(error => console.log(error));
  }

  useEffect(() => {
    //   빅커머스 총 오더갯수 호출
    callApi();
  }, []);
  return (
    //   사이드 바
    <div className=" flex-col items-center ">
      {/* 사명 */}
      <div
        onClick={() => auth.signOut()}
        className="text-2xl font-mono font-bold text-center text-gray-200 bg-blue-900 p-6"
      >
        InterAsia
      </div>

      {/* 총 주문갯수들 */}
      <div className="py-8 text-gray-300 bg-blue-900 leading-7 p-6">
        <div className="flex justify-between cursor-pointer hover:text-gray-50">
          <div className="pr-4">total</div>
          <div>{status?.data?.count}</div>
        </div>

        {status?.data?.statuses?.map(statuse => (
          <StatusMenus
            key={statuse.id}
            id={statuse.id}
            name={statuse.custom_label}
            count={statuse.count}
          />
        ))}
      </div>

      {/* 사이드바 좌하단 메뉴들 */}
      <div className="bg-gray-600 p-12 pb-96 text-lg text-gray-300 leading-10">
        <div className="cursor-pointer hover:text-gray-50">상품관리</div>
        <div className="cursor-pointer hover:text-gray-50">재고관리</div>
        <div
          onClick={() => history.push("/crproduct")}
          className="cursor-pointer hover:text-gray-50"
        >
          수집상품
        </div>
        <div className="cursor-pointer hover:text-gray-50">메뉴들 2</div>
        <div className="cursor-pointer hover:text-gray-50">메뉴들 3</div>
      </div>
    </div>
  );
}
