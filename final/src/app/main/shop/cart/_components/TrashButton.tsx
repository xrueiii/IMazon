"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { deleteCart } from "@/app/main/warehouse/[productId]/_components/actions";
import { publicEnv } from "@/lib/env/public";

type Props = {
  cartId: string;
};

function TrashButton({ cartId }: Props) {
  const router = useRouter();
  return (
    <form
      action={async () => {
        const proId = cartId;
        await deleteCart(proId);
        router.refresh();
        router.push(`${publicEnv.NEXT_PUBLIC_BASE_URL}/main/shop/cart`);
      }}
    >
      <button type={"submit"}>
        <Image src="/delete.png" alt="delete photo" width={20} height={20} />
      </button>
    </form>
  );
}

export default TrashButton;
