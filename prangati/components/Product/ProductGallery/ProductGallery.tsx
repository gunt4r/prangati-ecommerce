import "./styleProductGallery.scss";
import Slider from "react-slick";
import { useRef } from "react";

import { Image } from "@/config/interfaces";
export default function ProductGallery({ images }: { images: Image[] }) {
  const mainRef = useRef();
  const thumbRef = useRef();
  const settingsMain = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: thumbRef.current,
    draggable: true,
    arrows: false,
  };
  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: mainRef.current,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    draggable: true,
  };

  return (
    <section className="gallery__container">
      <Slider ref={mainRef} {...settingsMain}>
        {images.map((img, i) => (
          <div key={`${i}`} className="gallery__main__item" data-value={i + 1}>
            <img alt={`Slide ${i}`} src={img.path} />
          </div>
        ))}
      </Slider>
      <Slider  ref={thumbRef} className="thumbs-wrapper " {...settingsThumbs}>
        {images.map((img, i) => (
          <div key={`${i}`} className="thumbs__main--item" data-value={i + 1}>
            <img alt={`Slide ${i}`} src={img.path} />
          </div>
        ))}
      </Slider>
    </section>
  );
}
