import React from "react";

const AdminChatSidebar = ({ rooms, setRoomId }) => {
  return (
    <div className="h-screen w-1/3 flex flex-col bg-red-200 overflow-y-scroll">
      {rooms &&
        rooms.map(room => (
          <div
            key={room.id}
            className="h-auto p-2 bg-gray-200 text-center my-2 border"
          >
            <div key={room.id} onClick={() => setRoomId(room.id)}>
              {room.data.userName}
            </div>
            <div>최신메세지</div>
          </div>
        ))}
    </div>
  );
};

export default AdminChatSidebar;
