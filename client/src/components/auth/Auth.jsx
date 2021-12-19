import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth({ sessionToken, updateToken }) {
  const [loginShowing, setLoginShowing] = useState(true);

  return (
    <div>
      {loginShowing ? (
        <Login token={sessionToken} updateToken={updateToken} />
      ) : (
        <Signup updateToken={updateToken} token={sessionToken} />
      )}
    </div>
  );
}
