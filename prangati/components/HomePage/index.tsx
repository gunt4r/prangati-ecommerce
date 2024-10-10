import NewsLetter from "./NewsLetter/NewsLetter.tsx";
import PopularProducts from "./PopularProducts/PopularProducts.tsx";

import Header from "@/components/Header/Headerpage.tsx";

import "@/styles/globals.css";
function HomePage() {
  return (
    <>
      <Header />
      <PopularProducts />
      <NewsLetter />
    </>
  );
}

export default HomePage;
