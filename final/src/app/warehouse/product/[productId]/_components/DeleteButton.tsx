"use client";

import { redirect, useRouter } from "next/navigation";

import { publicEnv } from "@/lib/env/public";

import { deleteProduct } from "./actions";

type Props = {
  productId: string;
};

function DeleteButton({ productId }: Props) {
  const router = useRouter();
  return (
    <form
      action={async () => {
        const proId = productId;
        await deleteProduct(proId);
        //revalidatePath("layout");
        router.refresh();
        redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/warehouse`);
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
