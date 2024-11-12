import Discover from "./Discover/Discover";
import Vision from "./Vision/Vision";

import Header from "@/components/Header/Headerpage";
import Footer from "@/components/Footer/Footer";
import CommunityAbout from "./Community/Community";
export default function About() {
  return (
    <>
      <Header />
      <Discover />
      <Vision />
      <CommunityAbout />
      <Footer />
    </>
  );
}
