"use client";

import { useRouter } from "next/navigation";
import { deleteProduct } from "./actions";
import { publicEnv } from "@/lib/env/public";

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
        router.refresh();
        router.push(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/warehouse`);
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
