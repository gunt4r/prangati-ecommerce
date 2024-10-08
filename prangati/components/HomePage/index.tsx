/* eslint-disable prettier/prettier */
import NewsLetter from "./NewsLetter/NewsLetter.tsx";

import Header from "@/components/Header/Headerpage.tsx";

import "@/styles/globals.css";
function HomePage() {
  return (
    <>
      <Header />
      <NewsLetter />
    </>
  );
}

export default HomePage;
