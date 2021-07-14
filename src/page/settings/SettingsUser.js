import React from "react";

const SettingsUser = ({ displayName, email, phoneNumber, type, uid }) => {
  // 수정 가능해야할 목록 확인먼저 하고 수정
  return (
    <div className="grid grid-cols-6">
      <select name="" id="" defaultValue={type}>
        <option value="none">설정전</option>
        <option value="admin">관리자</option>
        <option value="customer">거래처</option>
      </select>
      <div>{displayName}</div>
      <div>{email}</div>
      <div>{phoneNumber}</div>
      <div>{uid}</div>
    </div>
  );
};

export default SettingsUser;
