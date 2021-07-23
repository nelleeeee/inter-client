import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import StatusMenus from "./StatusMenus";

import { auth } from "../../firebase";

import "./dropdown.css";

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
    <div className="flex-col items-center w-auto ">
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
      <div className="bg-gray-600 p-12 text-lg text-gray-300 leading-10">
        {/* 상품 */}

        <div
          onClick={() => history.push("/addproduct")}
          className="cursor-pointer hover:text-gray-50"
        >
          상품추가
        </div>
        <div
          onClick={() => history.push("/crproduct")}
          className="cursor-pointer hover:text-gray-50"
        >
          상품리스트/수집
        </div>
        <div className="grid grid-cols-2">
          <div
            onClick={() => history.push("/b2b/admin")}
            className="cursor-pointer hover:text-gray-50"
          >
            B2B
          </div>
          <div
            onClick={() => history.push("/b2b")}
            className="cursor-pointer hover:text-gray-50"
          >
            shop
          </div>
        </div>
        {/* 거래처로 분류받은 매일로 관리 */}
        <div className="cursor-pointer hover:text-gray-50">거래처관리</div>

        {/* 여기서 구글 등 인증로그인한사람들 관리자/직원/거래처로 분류 */}
        <div
          onClick={() => history.push("/chats")}
          className="cursor-pointer hover:text-gray-50"
        >
          CHAT
        </div>
        <div
          onClick={() => history.push("/settings")}
          className="cursor-pointer hover:text-gray-50"
        >
          설정
        </div>
      </div>
    </div>
  );
}
