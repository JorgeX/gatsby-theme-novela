import React from "react";
import Slider from "react-slick";

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const Carousel = ({ children }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  if (!Array.isArray(children)) return null;

  const content = children.map((child) => {
    return (child && typeof child === 'object' && (<div key={`carousel-key-${uuid()}`}>{child}</div>));
  });

  return (
    <Slider {...settings}>{content}</Slider>
  );
};

export default Carousel;