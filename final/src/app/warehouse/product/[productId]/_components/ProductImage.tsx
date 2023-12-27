"use client";

import { useState } from "react";

import Image from "next/image";

import { auth } from "@/lib/auth";

import { getProductPhotos } from "./actions";

type Props = {
  productId: string;
};

async function ProductImage({ productId }: Props) {
  const session = await auth();
  if (!session?.user?.id) return null;
  const userId = session.user.id;

  const images = await getProductPhotos(productId);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const changePhoto = (increment: number) => {
    let newIndex: number = (currentPhotoIndex + increment) % images.length;
    if (newIndex < 0) {
      newIndex = images.length - 1;
    }
    setCurrentPhotoIndex(newIndex);
  };

  return (
    <div>
      <button onClick={() => changePhoto(-1)}>
        <Image src="/prev.png" alt="previous arrow" width={30} height={30} />
      </button>
      <Image
        src={images[currentPhotoIndex].productImageLink}
        alt="Product photo"
        width={350}
        height={350}
      />
      <button onClick={() => changePhoto(1)}>
        <Image src="/next.png" alt="next arrow" width={30} height={30} />
      </button>
    </div>
  );
}

export default ProductImage;
