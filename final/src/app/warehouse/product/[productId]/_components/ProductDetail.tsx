"use client";

import { useState } from "react";


type Props = {
  detail_1: {
    productName: string;
    productDescription: string;
    sellerdisplayId: string;
  };

  detail_2: {
    productQuantity: number;
    productSold: number | null;
    productPrice: string;
    productStyle: string;
  }[];
};

function ProductDetail({ detail_1, detail_2 }: Props) {

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleStyleSelection = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <div className="flex h-14 w-full items-center justify-start text-3xl font-medium">
        {detail_1.productName}
      </div>
      <div className="flex h-14 w-full items-center justify-start text-4xl font-semibold  text-teal-900">
        NT$ {detail_2[currentIndex].productPrice}
      </div>
      <div className="flex h-14 w-full items-center justify-start gap-10 text-xl">
        <span>庫存尚有：{detail_2[currentIndex].productQuantity}</span>
        <span>已售出：{detail_2[currentIndex].productSold}</span>
      </div>
      <div className="flex h-24 w-full items-center justify-start gap-4 px-8 py-3">
        {detail_2.map((detail, index) => (
          <button
            key={index}
            className={`h-12 rounded-md border-2 bg-white px-4 ${
              isHovered
                ? "bg-slate-200" // Apply hover style for selected style
                : "hover:bg-slate-200" // Apply hover style for other styles
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => handleStyleSelection(index)}
          >
            {detail.productStyle}
          </button>
        ))}
      </div>
    </>
  );
}

export default ProductDetail;
