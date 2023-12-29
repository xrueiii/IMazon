"use client";

import type { FormEvent } from "react";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

// Import FormEvent type from React
import useProducts from "@/hooks/useProduct";
import { publicEnv } from "@/lib/env/public";

export default function FinishAdding() {
  const { addProduct, addProductDetail } = useProducts();
  const router = useRouter();
  const session = useSession();
  const userId = session?.data?.user?.id;
  const productName = "winehefhufhru";
  const productDescription = "good";
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  const handleFinish = async (e: FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      console.log("start trying");
      const newProductId = await addProduct(
        userId,
        productName,
        productDescription,
      );
      console.log(newProductId);
      
      if (newProductId) {
        await addProductDetail(
        newProductId,
        11,
        "123",
        "blue",
        "data:image/jpeg;base64,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",
      );} else {
        alert("The name has been used");
      }

      router.push(`${publicEnv.NEXT_PUBLIC_BASE_URL}/warehouse/product/${newProductId}`);
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
