import Image from "next/image";

import { getProductDetail_1, getProductPhotos } from "./actions";

type Props = {
  productId: string;
};

export default async function ProductDescription({ productId }: Props) {
  const productDetail1 = await getProductDetail_1(productId);
  const productPhotos = await getProductPhotos(productId);

  return (
    <div
      className="w-3/5 grow overflow-y-scroll text-lg"
      style={{ lineHeight: "1.8" }}
    >
      <div className="text-3xl font-medium">產品介紹：</div>
      <br />
      <div className="whitespace-pre-line">
        {productDetail1.productDescription}
      </div>
      <br />
      {productPhotos.map((photo, index) => (
        <Image
          key={index}
          src={photo.productImageLink}
          alt="DescProduct photo"
          width={350}
          height={350}
        />
      ))}
    </div>
  );
}
