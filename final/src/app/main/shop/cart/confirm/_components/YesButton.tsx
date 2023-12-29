"use client";

import { useRouter } from "next/navigation";

export default function YesButton() {
  const router = useRouter();
  const handleOnClick = () => {
    router.push("/main/shop/cart/confirm/success");
  };
  return (
    <button
      onClick={handleOnClick}
      className="h-12 rounded-md border-2 bg-teal-900 px-4 text-white hover:bg-teal-800 "
    >
      Confirm
    </button>
  );
}
