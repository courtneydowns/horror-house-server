import React from "react";
import Navbar from "../navbar/Navbar";

export default function Homepage({ clearToken }) {
  return (
    <>
      <h1>Hello World</h1>
      <Navbar clickLogout={clearToken} />
    </>
  );
}
