"use client";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { publicEnv } from "@/lib/env/public";

import { deleteProduct } from "./actions";

type Props = {
  productId: string;
};

function DeleteButton({ productId }: Props) {
  return (
    <form
      action={async () => {
        const proId = productId;
        await deleteProduct(proId);
        revalidatePath("/product");
        redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/product`);
      }}
    >
      <button
        className="h-12 rounded-md border-2 bg-white px-4 text-red-500 hover:bg-slate-200 "
        type={"submit"}
      >
        delete
      </button>
    </form>
  );
}

export default DeleteButton;
