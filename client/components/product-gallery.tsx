"use client";

import React from "react";
import ImageGallery from "react-image-gallery";

type ProductGalleryProps = {
  // images: { src: string; alt: string }[];
};

const ProductGallery: React.FC<ProductGalleryProps> = () => {
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];

  return (
    <ImageGallery
      items={images}
      infinite={false}
      showFullscreenButton={false}
      showPlayButton={false}
      showNav={false}
      lazyLoad
      additionalClass="product-gallery"
    />
  );
};

export default ProductGallery;
