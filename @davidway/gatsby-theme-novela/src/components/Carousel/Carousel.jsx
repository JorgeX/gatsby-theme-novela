import React from "react";
import Slider from "react-slick";

const Carousel = ({ children }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const content = children.map((child) => {
    return (child && typeof child === 'object' && (<div>{child}</div>));
  });

  return (
    <Slider {...settings}>{content}</Slider>
  );
};

export default Carousel;