import React from "react";

const Message = ({ user, message, createdAt }) => {
  return (
    <>
      {user === "interasiadev@gmail.com" ? (
        <>
          <div className="flex flex-row justify-start">
            <div className="w-2/5 bg-gray-200">
              <div className=" text-xs">
                {user === "interasiadev@gmail.com" ? "관리자" : user}
              </div>
              <div className="bg-white rounded-md w-auto p-1">{message}</div>
            </div>

            <div className="text-2xs pt-5">
              {new Date(createdAt?.toDate()).toLocaleTimeString()}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row justify-end ">
            <div className="w-2/5 bg-gray-200">
              <div className=" text-xs">
                {user === "interasiadev@gmail.com" ? "관리자" : user}
              </div>
              <div className="bg-white w-auto rounded-md p-1">{message}</div>
              <div className="bg-white w-auto rounded-md p-1">{message}</div>
              <div className="bg-white w-auto rounded-md p-1">{message}</div>
              <div className="bg-white w-auto rounded-md p-1">{message}</div>
              <div className="bg-white w-auto rounded-md p-1">{message}</div>
              <div className="bg-white w-auto rounded-md p-1">{message}</div>
            </div>

            <div className="text-2xs pt-5">
              {new Date(createdAt?.toDate()).toLocaleTimeString()}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Message;
