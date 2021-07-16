import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import SettingsUser from "./SettingsUser";

const Settings = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    db.collection("accounts").onSnapshot(snapshot =>
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
    );
  }, []);
  return (
    <div className="w-9/12">
      {/* 타이틀 */}
      <div>설정</div>

      {/* 버튼s */}
      <div>
        <button>유저관리</button>
        {" / "}
        <button>유저관리</button>
      </div>
      {/* contents */}
      {/* contents header */}
      <div className="grid grid-cols-6">
        {console.log(users)}
        <div>Type</div>
        <div>이름</div>
        <div>이메일</div>
        <div>번호</div>
        <div>uid</div>
      </div>
      {/* contents body */}
      {users.map(user => (
        <SettingsUser
          key={user.id}
          id={user.id}
          displayName={user.data.displayName}
          email={user.data.email}
          phoneNumber={user.data.phoneNumber}
          type={user.data.type}
          uid={user.data.uid}
        />
      ))}
    </div>
  );
};

export default Settings;
