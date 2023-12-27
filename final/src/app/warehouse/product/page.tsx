"use client";

import { useState } from "react";

import Image from "next/image";

interface Style {
  name: string;
  label: string;
  price: number;
  inventory: number;
  sold: number;
  photoUrl: string;
  description: string;
  descPhoto: string;
}

const styles: Style[] = [
  {
    name: "荷包蛋 毯子A613系列【日本和樂の音色】",
    label: "荷包蛋",
    price: 423,
    inventory: 43,
    sold: 108,
    photoUrl: "/egg.jpeg",
    description:
      "產品尺寸: \n【XL號】 142 x 184 cm\n【L號】 108.5 x 141.5 cm\n【S號】 73 x 88.5 cm  \n出貨包裝:  品牌牛皮紙袋 \n清潔保養方式:  手洗/機洗請放洗衣袋。 \n產地:  中國(由日本總公司監製, 和樂音色中國分公司生產)",
    descPhoto: "/egg.jpeg",
  },
  {
    name: "荷包蛋加培根 毯子A613系列【日本和樂の音色】",
    label: "荷包蛋+培根",
    price: 650,
    inventory: 52,
    sold: 98,
    photoUrl: "/egg2.jpeg",
    description:
      "產品尺寸: \n【XL號】 142 x 184 cm\n【L號】 108.5 x 141.5 cm\n【S號】 73 x 88.5 cm \n出貨包裝: 品牌牛皮紙袋 \n清潔保養方式: 手洗/機洗請放洗衣袋。 \n產地: 中國(由日本總公司監製, 和樂音色中國分公司生產)",
    descPhoto: "/egg2.jpeg",
  },
];

// eslint-disable-next-line react/function-component-definition
const ProductPage: React.FC = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [selectedStyle, setSelectedStyle] = useState<Style>(styles[0]);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const changePhoto = (increment: number) => {
    let newIndex: number = (currentPhotoIndex + increment) % styles.length;
    if (newIndex < 0) {
      newIndex = styles.length - 1;
    }
    setCurrentPhotoIndex(newIndex);
    setSelectedStyle(styles[newIndex]);
  };

  const handleStyleSelection = (style: Style) => {
    setSelectedStyle(style);
  };

  return (
    <div className="flex h-full w-full grow flex-wrap justify-center overflow-y-scroll rounded-b-xl border-2">
      <div className="relative flex h-96 w-2/5 items-center justify-center gap-2 bg-white p-2">
        <button onClick={() => changePhoto(-1)}>
          <Image src="/prev.png" alt="previous arrow" width={30} height={30} />
        </button>
        <Image
          src={selectedStyle.photoUrl}
          alt="Product photo"
          width={350}
          height={350}
        />
        <button onClick={() => changePhoto(1)}>
          <Image src="/next.png" alt="next arrow" width={30} height={30} />
        </button>
      </div>
      <div className="relative flex h-96 w-3/5 flex-wrap bg-white">
        <div className="flex h-24 w-full items-center justify-end gap-4 px-8 py-3">
          <button className="h-12 rounded-md border-2 bg-white px-4 text-red-500 hover:bg-slate-200 ">
            delete
          </button>
          <button className="h-12 rounded-md border-2 bg-white px-4 hover:bg-slate-200 ">
            edit
          </button>
        </div>
        <div className="flex h-48 w-full flex-wrap gap-x-4 bg-white px-8">
          <div className="flex h-14 w-full items-center justify-start text-3xl font-medium">
            {selectedStyle.name}
          </div>
          <div className="flex h-14 w-full items-center justify-start text-4xl font-semibold  text-teal-900">
            NT$ {selectedStyle.price}
          </div>
          <div className="flex h-14 w-full items-center justify-start gap-10 text-xl">
            <span>庫存尚有：{selectedStyle.inventory}</span>
            <span>已售出：{selectedStyle.sold}</span>
          </div>
        </div>
        <div className="flex h-24 w-full items-center justify-start gap-4 px-8 py-3">
          {styles.map((style, index) => (
            <button
              key={index}
              className={`h-12 rounded-md border-2 bg-white px-4 ${
                isHovered && selectedStyle.label === style.label
                  ? "bg-slate-200" // Apply hover style for selected style
                  : "hover:bg-slate-200" // Apply hover style for other styles
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => handleStyleSelection(style)}
            >
              {style.label}
            </button>
          ))}
        </div>
      </div>
      <div
        className="min-h-0 w-3/5 grow overflow-y-scroll  p-8 text-lg"
        style={{ lineHeight: "1.8" }}
      >
        <div className="text-3xl font-medium">產品介紹：</div>
        <br />
        {selectedStyle.description.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        <Image
          src={selectedStyle.descPhoto}
          alt="DescProduct photo"
          width={350}
          height={350}
        />
      </div>
      <div className="min-h-screen w-2/5 grow overflow-y-scroll bg-gray-400"></div>
    </div>
  );
};

export default ProductPage;
