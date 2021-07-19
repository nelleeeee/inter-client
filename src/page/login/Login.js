import React from "react";
import { auth, provider } from "../../firebase";

function Login() {
  const signIn = () => {
    auth.signInWithRedirect(provider).catch(e => alert(e.message));
  };
  return (
    <div className="h-screen grid place-items-center bg-gray-100">
      <div className=" p-24 text-center rounded-lg bg-white ">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/interasiastock.appspot.com/o/assets%2Flo.jpeg?alt=media&token=ea92d0b2-5857-45a7-8552-6ff0b87e7db7"
          alt="logo"
          className="bg-contain h-96"
        />
        <button
          className="mt-12 bg-blue-500 text-2xl text-gray-50 px-8 py-3 rounded-md"
          onClick={signIn}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
