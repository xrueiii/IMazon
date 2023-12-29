import { useState, type FormEvent } from "react";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

// Import FormEvent type from React
import useProducts from "@/hooks/useProduct";
import { publicEnv } from "@/lib/env/public";
import { Product, ProductDetail } from "@/lib/types";

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
  if (price === "" || style === "" || quantity === 0 || image === "") {
    alert("Please finish all the column or go to last step to finish addig");
    return;
  }

  const prodcuctImageLink =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCANIAnQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiijNABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABUE1xHCOWG4nAHepjyDVEQRrJ5khBbPHoKmTfQuCT3LynIBpaYjZ7jHan1SJYUUUUCCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKhmZgOOPQ1NWffXKxYVuef0qZOyLpxcpWRejzsGetOqvaXC3EQZenarFNaomSadmFZlykv2ndkBBWnWXqTyoMqQPxqZ7GtHWVi7Cy4GBjNT1iWd2Wccge5rYRgVBzRCVwq03B6j6KKKsxCiiigAoqPf8Av9ntUlFxtWCiiigQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRSZooAWikopALRSZoouAtFJS0wCiiigAooooAKxtWUht3GB1z6Vs1i622y3kYkABSee9RU+E6MN/ERNp08OAsTKQeCc9606848H6pHcNLvlVZFkbCsevNehwyLIny9qmlPmiaYyg6cySs3VU/dk55xwPetKsvVnwvHJHaqn8Jjh/4iMGzMoLvMwU543GuhsLkSj7wIrgtSlm84BXwuecVvaTJsgjJkXdn1rmhKzPWxNDmhc7EHijNRQtujHNPrrTujxGrMXNBNJUU77EznFDdgSu7DSyCcNnnpVjNZLT/AHT1weoNaiMGQEelRGWppUhZIfRSUtaGQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUlJmlcBaQmms1RM9S5FKNyUtSbxVcye9RmU561NzRUy35lIZKqebSeb70rlezLnmUvmVS8znrThJ707h7Mub6eGzVFZOetSrJTTIcC1mlzUKvmnhqpSM2rD6KTNGaoQprn/Efz2MgLbeMVvk8Vx3i2O4uLFhBIEb3rKs7ROzBRvWR5vIEfXEe1IjweefSvWNB1HzIIkk4YjGfWvD5Wltr8jI3A4I9a7rwxrDmRBK4LA461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";

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
      let temp: Omit<ProductDetail, "id" | "productId" | "sold">[] =
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
      router.push(`/warehouse/product/${newProductId}`);
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
