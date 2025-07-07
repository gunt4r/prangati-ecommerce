import { HashLoader } from "react-spinners";

export default function Preloader() {
  return (
    <HashLoader
      style={{
        marginTop: "0",
        paddingTop: "0",
        backgroundColor: "#fff",
        position: "fixed",
        zIndex: "100",
        width: "100vw",
        height: "100vh",
        top: "0px",
        left: "0px",
      }}
    />
  );
}
