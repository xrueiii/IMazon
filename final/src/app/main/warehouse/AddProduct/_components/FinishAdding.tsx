import { useState, type FormEvent } from "react";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

// Import FormEvent type from React
import useProducts from "@/hooks/useProduct";
import { publicEnv } from "@/lib/env/public";
import type { Product, ProductDetail } from "@/lib/types";

type FinishProps = {
  price: string;
  style: string;
  quantity: number;
  image: string;
  productFisrtStep: Omit<Product, "id" | "sellerDisplayId">;
  productDetail: Omit<ProductDetail, "id" | "productId" | "sold">[];
};

export default function FinishAdding({
  price,
  style,
  quantity,
  image,
  productFisrtStep,
  productDetail,
}: FinishProps) {

  const [productDetailTemp, setProductDetailTemp] =
    useState<Omit<ProductDetail, "id" | "productId" | "sold">[]>(productDetail);

  // console.log("image link: " + image);
  // console.log(image);
  // console.log(productFisrtStep.productName);
  // productDetail.map((product) => {
  //   console.log(product.imageLink);
  // });
  const { addProduct, addProductDetail } = useProducts();
  const router = useRouter();
  const session = useSession();
  const userId = session?.data?.user?.id;
  // const productName = "wine";
  // const productDescription = "good";
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }

  if (price === "" || style === "" || quantity === 0 || image === "") {
    alert("Please finish all the column or go to last step to finish addig");
    return;
  }
  const handleFinish = async (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (productDetailTemp[productDetailTemp.length] === undefined) {
      // const tempProductDetail: Omit<
      //   ProductDetail,
      //   "id" | "productId" | "sold"
      // > = {
      //   price,
      //   style,
      //   quantity,
      //   imageLink: image,
      // };

      // setProductDetailTemp((prevProductDetails) => [
      //   ...prevProductDetails,
      //   tempProductDetail,
      // ]);
      const temp: Omit<ProductDetail, "id" | "productId" | "sold">[] =
        productDetail;
      temp.push({ price, style, quantity, imageLink: image });
      setProductDetailTemp(temp);
      console.log(temp);
      console.log(productDetailTemp);
      // console.log("image link");
      // console.log(image);
    }

    // console.log(productFisrtStep);
    try {
      console.log("start trying");
      const newProductId = await addProduct(
        userId,
        productFisrtStep.productName,
        productFisrtStep.productDescription,
      );
      // console.log(newProductId);
      for (let i = 0; i < productDetailTemp.length; i++) {
        await addProductDetail(
          newProductId,
          productDetailTemp[i].quantity,
          productDetailTemp[i].price,
          productDetailTemp[i].style,
          productDetailTemp[i].imageLink,
        );
      }
      // productDetailTemp.map(async (product) => {

      // });
      router.refresh();
      router.push(`/main/warehouse/${newProductId}`);
      // Additional logic or redirection can be added here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleFinish} // Attach the handler to the onSubmit event
      className="mb-3 w-full rounded-lg border-2 bg-teal-900 py-1 text-center text-sm text-white hover:bg-teal-700"
    >
      <button data-testid="add-submit-button" type="submit">
        Finish
      </button>
    </form>
  );
}