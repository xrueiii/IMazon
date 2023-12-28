import { addProduct, addProductDetail } from "./action";

export default function FinishAdding() {
  // const router = useRouter();
  //   const handleFinish = async () => {
  //     try {
  //       const newProduct = await addProduct("wine", "good");
  //       // for (let i = 0; i < productDetail.length; i++) {
  //       //   await addProductDetail(newProduct.id, productDetail[i].quantity, productDetail[i].price, productDetail[i].style, productDetail[i].imageLink);
  //       // }
  //       //   productDetail.map(async (detail) => {
  //       //     await addProductDetail(
  //       //       newProduct.id,
  //       //       detail.quantity,
  //       //       detail.price,
  //       //       detail.style,
  //       //       detail.imageLink,
  //       //     );
  //       //   });
  //       await addProductDetail("iddd", 11, "123", "blue", "hssssssss.com");
  //       //   router.push(
  //       //     `${publicEnv.NEXT_PUBLIC_BASE_URL}/warehouse/product/${newProduct.id}`,
  //       //   );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  return (
    <form
      action={async (e) => {
        "use server";
        const newProduct = await addProduct("wine", "good");
        await addProductDetail("iddd", 11, "123", "blue", "hssssssss.com");
      }}
      className="mb-3 w-full rounded-lg border-2 bg-teal-900 py-1 text-sm text-white hover:bg-teal-700"
    >
      <button
        data-testid="add-submit-button"
        type="submit"

        // onClick={handleFinish}
      >
        Finish
      </button>
    </form>
  );
}
