"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import useCart from "@/hooks/useCart";
import { publicEnv } from "@/lib/env/public";

type Props = {
  carts: {
    displayId: string;
  }[];
};

function YesButton({ carts }: Props) {
  const session = useSession();
  const userId = session?.data?.user?.id;
  if (!userId) {
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}`);
  }
  const router = useRouter();
  const { deleteCart } = useCart();

  const handleDelete = async () => {
    try {
      for (let i = 0; i < carts.length; i++) {
        await deleteCart(carts[i].displayId);
      }

      router.push(
        `${publicEnv.NEXT_PUBLIC_BASE_URL}/main/shop/cart/confirm/success`,
      );
    } catch (error) {
      console.error("Error deleting carts:", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleDelete();
      }}
    >
      <button
        type={"submit"}
        className="h-12 rounded-md border-2 bg-teal-900 px-4 text-white hover:bg-teal-800 "
      >
        Confirm
      </button>
    </form>
  );
}

export default YesButton;
