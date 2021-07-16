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
    <div className="flex-col items-center w-auto">
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
        {/* 상품관리 드랍다운 */}
        <div className=" w-48">
          <div className="dropdown inline-block relative">
            <button className="bg-gray-300 text-gray-700 font-semibold py-1 px-6 rounded inline-flex items-center w-30">
              <span className="mr-1">상품관리</span>
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
              </svg>
            </button>
            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
              <div
                className=" z-10 rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer hover:text-gray-50"
                onClick={() => history.push("/addproduct")}
              >
                추가
              </div>
              <div className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                수정/등록
              </div>
              <div
                className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer hover:text-gray-50"
                onClick={() => history.push("/crproduct")}
              >
                수집
              </div>
            </ul>
          </div>
        </div>
        {/* b2b  드랍다운 */}
        <div className="">
          <div className="dropdown inline-block relative">
            <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span className="mr-1 z-0">B2B</span>
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
              </svg>
            </button>
            <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
              <div
                className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer hover:text-gray-50"
                onClick={() => history.push("/b2b/admin")}
              >
                B2B Admin
              </div>
              <div
                className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap cursor-pointer hover:text-gray-50"
                onClick={() => history.push("/b2b")}
              >
                B2B Shop
              </div>
            </ul>
          </div>
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
          onClick={() => history.push("/settings")}
          className="cursor-pointer hover:text-gray-50"
        >
          설정
        </div>
      </div>
    </div>
  );
}
