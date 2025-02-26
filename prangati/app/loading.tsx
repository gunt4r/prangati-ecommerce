"use client";
import { HashLoader } from "react-spinners";

export default function ProductPage() {
  return (
    <HashLoader
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor:'#eaebed',
        zIndex:'100'
      }}
    />
  );
}
