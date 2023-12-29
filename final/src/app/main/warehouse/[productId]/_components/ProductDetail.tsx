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
  const [isClicked, setIsClicked] = useState<boolean[]>(
    new Array(detail_2.length).fill(false),
  );
  const [currentStyle, setCurrentStyle] = useState<string>("");

  const handleStyleSelection = (index: number) => {
    setIsClicked((prevIsClicked) => {
      const newIsClicked = [...prevIsClicked];
      newIsClicked[index] = true; // Mark the currently clicked button as true
      if (currentIndex !== index) {
        newIsClicked[currentIndex] = false; // Reset the previously clicked button to false
      }
      return newIsClicked;
    });

    setCurrentIndex(index);
    setCurrentStyle(detail_2[index].productStyle);
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
      <div className="flex h-24 w-full items-center justify-start gap-4  py-3">
        {detail_2.map((detail, index) => (
          <button
            key={index}
            id={index.toString()}
            className={`h-12 rounded-md border-2 bg-white px-4 hover:bg-slate-200 ${
              isClicked[index] ? "bg-slate-200" : "bg-white"
            }`}
            // onMouseEnter={() => setIsHovered(true)}
            // onMouseLeave={() => setIsHovered(false)}
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
