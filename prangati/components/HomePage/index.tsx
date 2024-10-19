import Footer from "../Footer/Footer.tsx";

import NewsLetter from "./NewsLetter/NewsLetter.tsx";
import PopularProducts from "./PopularProducts/PopularProducts.tsx";
import Promotions from "./Promotions/Promotions.tsx";
import ChooseSection from "./ChooseUS/ChooseSection.tsx";
import Categories from "./Categories/Categories.tsx";
import Gadgets from "./Gadgets/Gadgets.tsx";

import Header from "@/components/Header/Headerpage.tsx";

import "@/styles/globals.css";
function HomePage() {
  return (
    <>
      <Header />
      <Gadgets />
      <PopularProducts />
      <ChooseSection />
      <Promotions />
      <Categories />
      <NewsLetter />
      <Footer />
    </>
  );
}

export default HomePage;
