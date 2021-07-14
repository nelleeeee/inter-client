import React from "react";
import { auth, provider } from "../../firebase";

function Login() {
  const signIn = () => {
    auth.signInWithRedirect(provider).catch(e => alert(e.message));
  };
  return (
    <div>
      <div>
        <h1>Sign In to interasia</h1>
        <p>interasia.kr</p>
        <button onClick={signIn}>Sign in with Google</button>
      </div>
    </div>
  );
}

export default Login;
