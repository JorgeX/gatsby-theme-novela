import React from "react";
import ImageWithZoom from "react-medium-image-zoom";

function hideImageZoomBackground() {
  const images = Array.from(document.getElementsByClassName("Image__Zoom"));

  images.map(img => {
    if (img.previousElementSibling.tagName === "DIV") {
      img.previousElementSibling.style.display = "none";
    }
  });
}

function ImageZoom(props) {
  const image = {
    ...props,
    className: "Image__Zoom",
    style: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      visibility: "visible",
    },
  };

  return (
    <ImageWithZoom
      image={image}
      zoomImage={image}
      onZoom={hideImageZoomBackground}
      defaultStyles={{
        zoomImage: {
          borderRadius: "5px",
        },
      }}
    />
  );
}

export default ImageZoom;
